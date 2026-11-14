<?php

/**
 * @package     Joomla.Plugin
 * @subpackage  System.Jadp
 *
 * @copyright   (C) 2026 Brian Teeman
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace Joomla\Plugin\System\Jadp\Extension;

use Joomla\CMS\Document\HtmlDocument;
use Joomla\CMS\Event\Application\BeforeCompileHeadEvent;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\Uri\Uri;
use Joomla\Event\SubscriberInterface;

// phpcs:disable PSR1.Files.SideEffects
\defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * System plugin providing visitor display preferences.
 *
 * @since  __DEPLOY_VERSION__
 */
final class Jadp extends CMSPlugin implements SubscriberInterface
{
    /**
     * Returns the events this plugin subscribes to.
     *
     * @return array<string, string>
     *
     * @since __DEPLOY_VERSION__
     */
    public static function getSubscribedEvents(): array
    {
        return [
            'onBeforeCompileHead' => 'onBeforeCompileHead',
            'onAfterRender'       => 'onAfterRender',
        ];
    }

    /**
     * Register frontend assets.
     *
     * @param   BeforeCompileHeadEvent  $event  The event.
     *
     * @return  void
     *
     * @since __DEPLOY_VERSION__
     */
    public function onBeforeCompileHead(BeforeCompileHeadEvent $event): void
    {
        if (!$this->isEnabledForSite()) {
            return;
        }

        $document = $this->getApplication()->getDocument();

        if (!$document instanceof HtmlDocument) {
            return;
        }

        $this->loadLanguage();

        $assets = $document->getWebAssetManager();

        $assets->registerAndUseStyle(
            'plg.system.jadp',
            'plg_system_jadp/css/jadp.css'
        );

        $assets->registerAndUseScript(
            'plg.system.jadp.init',
            'plg_system_jadp/js/jadp-init.js',
            [],
            ['defer' => false]
        );

        $assets->registerAndUseScript(
            'plg.system.jadp',
            'plg_system_jadp/js/jadp.js',
            [],
            ['defer' => true]
        );

        $assets->registerAndUseScript(
            'plg.system.jadp.ui',
            'plg_system_jadp/js/jadp-ui.js',
            [],
            ['defer' => true]
        );
    }

    /**
     * Add the toolbar host to the rendered frontend document.
     *
     * @return  void
     *
     * @since __DEPLOY_VERSION__
     */
    public function onAfterRender(): void
    {
        if (!$this->isEnabledForSite()) {
            return;
        }

        $body = $this->getApplication()->getBody();

        if (stripos($body, '</body>') === false) {
            return;
        }

        $this->loadLanguage();

        $attributes = [
            'data-jadp-css' => Uri::root(true) . '/media/plg_system_jadp/css/jadp-ui.css',
            'data-open-label' => Text::_('PLG_SYSTEM_JADP_OPEN'),
            'data-close-label' => Text::_('PLG_SYSTEM_JADP_CLOSE'),
            'data-title' => Text::_('PLG_SYSTEM_JADP_TITLE'),
            'data-text-size' => Text::_('PLG_SYSTEM_JADP_TEXT_SIZE'),
            'data-normal' => Text::_('PLG_SYSTEM_JADP_NORMAL'),
            'data-large' => Text::_('PLG_SYSTEM_JADP_LARGE'),
            'data-extra-large' => Text::_('PLG_SYSTEM_JADP_EXTRA_LARGE'),
            'data-reset' => Text::_('PLG_SYSTEM_JADP_RESET'),
            'data-disclaimer' => Text::_('PLG_SYSTEM_JADP_DISCLAIMER'),
        ];

        $host = '<div id="jadp-root"';

        foreach ($attributes as $name => $value) {
            $host .= ' ' . $name . '="' . htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . '"';
        }

        $host .= '></div>';

        $this->getApplication()->setBody(str_ireplace('</body>', $host . '</body>', $body));
    }

    /**
     * Check that the plugin is enabled for a frontend HTML request.
     *
     * @return bool
     *
     * @since __DEPLOY_VERSION__
     */
    private function isEnabledForSite(): bool
    {
        return $this->params->get('enabled', 1)
            && $this->getApplication()->isClient('site')
            && $this->getApplication()->getDocument() instanceof HtmlDocument;
    }
}
