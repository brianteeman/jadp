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
        ];
    }

    /**
     * Register frontend assets and toolbar options when Joomla compiles the document head.
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

        $document->addScriptOptions('plg_system_jadp', [
            'css' => Uri::root(true) . '/media/plg_system_jadp/css/jadp-ui.css',
            'labels' => [
                'open' => Text::_('PLG_SYSTEM_JADP_OPEN'),
                'close' => Text::_('PLG_SYSTEM_JADP_CLOSE'),
                'title' => Text::_('PLG_SYSTEM_JADP_TITLE'),
                'textSize' => Text::_('PLG_SYSTEM_JADP_TEXT_SIZE'),
                'lineSpacing' => Text::_('PLG_SYSTEM_JADP_LINE_SPACING'),
                'letterSpacing' => Text::_('PLG_SYSTEM_JADP_LETTER_SPACING'),
                'wordSpacing' => Text::_('PLG_SYSTEM_JADP_WORD_SPACING'),
                'contrast' => Text::_('PLG_SYSTEM_JADP_CONTRAST'),
                'normalContrast' => Text::_('PLG_SYSTEM_JADP_NORMAL_CONTRAST'),
                'highContrast' => Text::_('PLG_SYSTEM_JADP_HIGH_CONTRAST'),
                'grayscale' => Text::_('PLG_SYSTEM_JADP_GRAYSCALE'),
                'normalGrayscale' => Text::_('PLG_SYSTEM_JADP_NORMAL_GRAYSCALE'),
                'grayscaleOn' => Text::_('PLG_SYSTEM_JADP_GRAYSCALE_ON'),
                'underlineLinks' => Text::_('PLG_SYSTEM_JADP_UNDERLINE_LINKS'),
                'normalLinkStyle' => Text::_('PLG_SYSTEM_JADP_NORMAL_LINK_STYLE'),
                'underline' => Text::_('PLG_SYSTEM_JADP_UNDERLINE'),
                'normal' => Text::_('PLG_SYSTEM_JADP_NORMAL'),
                'increased' => Text::_('PLG_SYSTEM_JADP_INCREASED'),
                'maximum' => Text::_('PLG_SYSTEM_JADP_MAXIMUM'),
                'large' => Text::_('PLG_SYSTEM_JADP_LARGE'),
                'extraLarge' => Text::_('PLG_SYSTEM_JADP_EXTRA_LARGE'),
                'reset' => Text::_('PLG_SYSTEM_JADP_RESET'),
            ],
        ]);

        $wa = $document->getWebAssetManager();
        $wa->getRegistry()->addExtensionRegistryFile('plg_system_jadp');

        $wa->useStyle('plg.system.jadp')
            ->useScript('plg.system.jadp.init')
            ->useScript('plg.system.jadp.ui');
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
