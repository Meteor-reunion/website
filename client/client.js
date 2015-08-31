Meteor.startup(function() {     
language = window.navigator.userLanguage || window.navigator.language;
    TAPi18n.setLanguage(language)
      .done(function () {

      })
      .fail(function (error_message) {
        console.log(error_message);
      });  
});