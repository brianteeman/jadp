<?php

/**
 * @package     Joomla.Plugin
 * @subpackage  System.Jadp2
 *
 * @copyright   (C) 2026 Brian Teeman
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace Joomla\Plugin\System\Jadp2\Extension;

use Joomla\CMS\Document\HtmlDocument;
use Joomla\CMS\Event\Application\BeforeCompileHeadEvent;
use Joomla\CMS\HTML\HTMLHelper;
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
final class Jadp2 extends CMSPlugin implements SubscriberInterface
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
        $application = $event->getApplication();
        $document = $event->getDocument();

        if (!$document instanceof HtmlDocument) {
            return;
        }

        $perUserEnabled = $this->isEnabledForClient('per_user_enabled_clients', 'none');
        $perSiteEnabled = $this->isEnabledForClient('per_site_enabled_clients', 'administrator');

        if (!$perUserEnabled && !$perSiteEnabled) {
            return;
        }

        $wa = $document->getWebAssetManager();
        $wa->getRegistry()->addExtensionRegistryFile('plg_system_jadp2');

        if ($perUserEnabled) {
            $this->loadLanguage();

            $wa->useStyle('plg.system.jadp2')
                ->useScript('plg.system.jadp2.init');

            if ($application->getInput()->getCmd('tmpl') === 'component') {
                $wa->useScript('plg.system.jadp2.engine');
            } else {
                $document->addScriptOptions('plg_system_jadp2', [
                    'css' => $wa->getAsset('style', 'plg.system.jadp2.ui')->getUri() . '?' . $document->getMediaVersion(),
                    'triggerPosition' => $this->params->get('trigger_position', 'bottom-left'),
                    'triggerIcon' => [
                        'type' => $this->params->get('trigger_icon_type', 'default'),
                        'class' => trim((string) $this->params->get('trigger_icon_class', '')),
                        'css' => trim((string) $this->params->get('trigger_icon_css', '')),
                        'image' => $this->getTriggerIconImage(),
                    ],
                    'labels' => [
                        'open' => Text::_('PLG_SYSTEM_JADP2_OPEN'),
                        'skipOpen' => Text::_('PLG_SYSTEM_JADP2_SKIP_OPEN'),
                        'close' => Text::_('PLG_SYSTEM_JADP2_CLOSE'),
                        'title' => Text::_('PLG_SYSTEM_JADP2_TITLE'),
                        'textSize' => Text::_('PLG_SYSTEM_JADP2_TEXT_SIZE'),
                        'lineSpacing' => Text::_('PLG_SYSTEM_JADP2_LINE_SPACING'),
                        'letterSpacing' => Text::_('PLG_SYSTEM_JADP2_LETTER_SPACING'),
                        'wordSpacing' => Text::_('PLG_SYSTEM_JADP2_WORD_SPACING'),
                        'contrast' => Text::_('PLG_SYSTEM_JADP2_CONTRAST'),
                        'normalContrast' => Text::_('PLG_SYSTEM_JADP2_NORMAL_CONTRAST'),
                        'highContrast' => Text::_('PLG_SYSTEM_JADP2_HIGH_CONTRAST'),
                        'colourMode' => Text::_('PLG_SYSTEM_JADP2_COLOUR_MODE'),
                        'normalColour' => Text::_('PLG_SYSTEM_JADP2_NORMAL_COLOUR'),
                        'monochrome' => Text::_('PLG_SYSTEM_JADP2_MONOCHROME'),
                        'underlineLinks' => Text::_('PLG_SYSTEM_JADP2_UNDERLINE_LINKS'),
                        'normalLinkStyle' => Text::_('PLG_SYSTEM_JADP2_NORMAL_LINK_STYLE'),
                        'underline' => Text::_('PLG_SYSTEM_JADP2_UNDERLINE'),
                        'normal' => Text::_('PLG_SYSTEM_JADP2_NORMAL'),
                        'increased' => Text::_('PLG_SYSTEM_JADP2_INCREASED'),
                        'maximum' => Text::_('PLG_SYSTEM_JADP2_MAXIMUM'),
                        'large' => Text::_('PLG_SYSTEM_JADP2_LARGE'),
                        'extraLarge' => Text::_('PLG_SYSTEM_JADP2_EXTRA_LARGE'),
                        'reset' => Text::_('PLG_SYSTEM_JADP2_RESET'),
                    ],
                ]);

                $wa->useStyle('plg.system.jadp2.skip')
                    ->useScript('plg.system.jadp2.ui');
            }
        }

        if ($perSiteEnabled) {
            $this->loadLanguage();
            Text::script('PLG_SYSTEM_JADP2_EXTERNAL_LINK_NEW_WINDOW');

            $wa->useScript('plg.system.jadp2.externallink')
                ->useStyle('plg.system.jadp2.externallink');
        }
    }

    /**
     * Get the configured PNG icon URL.
     *
     * @return string
     *
     * @since __DEPLOY_VERSION__
     */
    private function getTriggerIconImage(): string
    {
        $image = trim((string) $this->params->get('trigger_icon_image', ''));

        if ($image === '') {
            return '';
        }

        $image = HTMLHelper::cleanImageURL($image)->url;

        if (!preg_match('/\.png$/i', parse_url($image, PHP_URL_PATH) ?: '')) {
            return '';
        }

        if (preg_match('#^https?://#i', $image)) {
            return $image;
        }

        return Uri::root() . ltrim($image, '/');
    }

    /**
     * Check that the plugin is enabled for the current client.
     *
     * @return bool
     *
     * @since __DEPLOY_VERSION__
     */
    private function isEnabledForClient(string $parameter, string $default): bool
    {
        $enabledFor = (string) $this->params->get($parameter, $default);
        $application = $this->getApplication();

        return $enabledFor === 'both'
            || ($enabledFor === 'site' && $application->isClient('site'))
            || ($enabledFor === 'administrator' && $application->isClient('administrator'));
    }
}
