;(function(){
  var InitMiddleWare = function(){
    var _protocol = "http:" === document.location.protocol ? "http" : "https";
    this.logo_type = 'official';
    this.logo_size = '124x47';
    this.auth_script = unescape('%3Cscript%20src%3D%22'+ _protocol +'%3A//static.anquan.org/static/outer/js/aq_auth.js%22%3E%3C/script%3E');
  };
  InitMiddleWare.prototype = {
    constructor: InitMiddleWare,
    getCode: function(){
      var tmpl = [
        '<a href="http://www.anquan.org" logo_size="',
        this.logo_size,
        '" ',
        'logo_type="',
        this.logo_type,
        '" ',
        'target="_blank">',
        this.auth_script,
        '</a>'
      ].join('');
      return tmpl;
    },
    build: function(){
      var aq_auth = this.getCode();
      document.write(aq_auth);
    }
  };
  var init = new InitMiddleWare();
  init.build();
})();
