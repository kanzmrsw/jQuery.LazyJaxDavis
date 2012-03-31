$(function(){

  var $root, Loading, Logger, loading, log, logger, Sidenav, sidenav;


  // tiny logger on top right

  Logger = (function() {
    function Logger() {
      this.$el = $('<div id="logger"></div>');
      $('body').append(this.$el);
    }
    Logger.prototype.items = [];
    Logger.prototype.log = function(msg) {
      var $item,
        _this = this;
      $item = $("<div>" + msg + "</div>");
      this.$el.prepend($item);
      this.items.push($item);
      setTimeout(function() {
        return $item.remove();
      }, 4000);
      if (this.items.length > 30) this.items[0].remove();
      return this;
    };
    return Logger;
  })();

  logger = new Logger;
  log = function(msg) { logger.log(msg); };


  // tiny loading on top left

  Loading = (function() {
    function Loading() {
      this.$el = $('<div id="loading">Loading...</div>').hide();
      $('body').append(this.$el);
    }
    Loading.prototype.show = function() {
      this.$el.show();
      return this;
    };
    Loading.prototype.hide = function() {
      this.$el.hide();
      return this;
    };
    return Loading;
  })();

  loading = new Loading;
  

  // sidenav
  
  Sidenav = (function(){
    function Sidenav() {
      this.$el = $('#sidenav');
      this.currentify(location.pathname);
    }
    Sidenav.prototype.currentify = function(path) {
      $('li', this.$el).each(function(){
        var $li = $(this);
        var $a = $('a', $li);
        if($a.attr('href')===path){
          $li.addClass('current');
        }else{
          $li.removeClass('current');
        }
      });
    };
    return Sidenav;
  })();

  sidenav = new Sidenav;


  // define the root of the main content

  $root = $('#lazyjaxdavisroot');


  // do it
  
  $.LazyJaxDavis(
  //[
  //  {
  //    path: '/jQuery.LazyJaxDavis/demos/applied/_site/',
  //    fetchstart: function() {
  //      log('index.html fetchstart');
  //    },
  //    fetchend: function() {
  //      log('index.html fetchend');
  //    }
  //  }
  //],
  {
    everyfetchstart: function(page) {
      log('everyfetchstart');
      $root.css('opacity', 0.6);
      window.scrollTo(0, 0);
      loading.show();
      sidenav.currentify(page.path);
    },
    everyfetchend: function(page) {
      var $newcontent;
      log('everyfetchend');
      $root.css('opacity', 1);
      loading.hide();
      $newcontent = $(page.rip('content')).hide()
      $root.empty().append($newcontent);
      $newcontent.fadeIn();
    },
    everyfetchfail: function() {
      log('everyfetchfail');
    }
  });


});

