/**
 * Navidrome App
 * Defined an App to manage navidrome
 */
var NavidromeApp = NavidromeApp || {} //Define navidrome App namespace.
/**
 * Constructor UNAS App
 */
NavidromeApp.App = function () {
  this.id = 'Navidrome'
  this.name = 'Navidrome'
  this.version = '6.0.1'
  this.active = false
  this.menuIcon = '/apps/navidrome/images/logo.png?v=6.0.1&'
  this.shortcutIcon = '/apps/navidrome/images/logo.png?v=6.0.1&'
  this.entryUrl = '/apps/navidrome/index.html?v=6.0.1&'
  var self = this
  this.NavidromeAppWindow = function () {
    if (UNAS.CheckAppState('Navidrome')) {
      return false
    }
    self.window = new MUI.Window({
      id: 'NavidromeAppWindow',
      title: UNAS._('Navidrome'),
      icon: '/apps/navidrome/images/logo_small.png?v=6.0.1&',
      loadMethod: 'xhr',
      width: 750,
      height: 480,
      maximizable: false,
      resizable: true,
      scrollbars: false,
      resizeLimit: { x: [200, 2000], y: [150, 1500] },
      contentURL: '/apps/navidrome/index.html?v=6.0.1&',
      require: { css: ['/apps/navidrome/css/index.css'] },
      onBeforeBuild: function () {
        UNAS.SetAppOpenedWindow('Navidrome', 'NavidromeAppWindow')
      },
    })
  }
  this.NavidromeUninstall = function () {
    UNAS.RemoveDesktopShortcut('Navidrome')
    UNAS.RemoveMenu('Navidrome')
    UNAS.RemoveAppFromGroups('Navidrome', 'ControlPanel')
    UNAS.RemoveAppFromApps('Navidrome')
  }
  new UNAS.Menu(
    'UNAS_App_Internet_Menu',
    this.name,
    this.menuIcon,
    'Navidrome',
    '',
    this.NavidromeAppWindow
  )
  new UNAS.RegisterToAppGroup(
    this.name,
    'ControlPanel',
    {
      Type: 'Internet',
      Location: 1,
      Icon: this.shortcutIcon,
      Url: this.entryUrl,
    },
    {}
  )
  var OnChangeLanguage = function (e) {
    UNAS.SetMenuTitle('Navidrome', UNAS._('Navidrome')) //translate menu
    //UNAS.SetShortcutTitle('Navidrome', UNAS._('Navidrome'));
    if (typeof self.window !== 'undefined') {
      UNAS.SetWindowTitle('NavidromeAppWindow', UNAS._('Navidrome'))
    }
  }
  UNAS.LoadTranslation(
    '/apps/navidrome/languages/Translation?v=' + this.version,
    OnChangeLanguage
  )
  UNAS.Event.addEvent('ChangeLanguage', OnChangeLanguage)
  UNAS.CreateApp(
    this.name,
    this.shortcutIcon,
    this.NavidromeAppWindow,
    this.NavidromeUninstall
  )
}

new NavidromeApp.App()
