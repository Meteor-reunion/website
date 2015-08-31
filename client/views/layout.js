Template.layout.events({
  'click [data-login-with=meetup]': function() {
    Meteor.loginWithMeetup({
      requestPermissions: []
    }, function (error) {
      if (error) {
        alert(TAPi18n.__(error));
      }
    });
  },

  'click [data-action=logout]': function() {
    Meteor.logout();
  }
});
