Template.meetupDetail.rendered = function() {
  window.setTimeout(function() {
    $('[data-toggle=tooltip]').tooltip();
  }, 800);
};

Template.meetupDetail.helpers({
  displayOverflowAttendees: function() {
    if (this.meetup) {
      return this.meetup.numberOfOverflowAttendees() > 0;
    }
  },

  currentUserIsAttendee: function() {
    if (this.meetup && Meteor.userId()) {
      return _(this.meetup.attendeeIds).include(Meteor.userId());
    }
  },

  attendeesHeading: function() {
    if (this.meetup && this.meetup.isPast()) {
      return TAPi18n.__("Who Went");
    } else {
      return TAPi18n.__("Who s Going");
    }
  },

  groupUrl: function() {
    return 'http://www.meetup.com/' + Meteor.settings.public.meetup.group_urlname;
  }
});

Template.meetupDetail.events({

  'click [data-action=rsvp]': function(event, template) {
    event.preventDefault();

    if (!Meteor.userId()) {
      alert(TAPi18n.__("Please sign in to RSVP!"));
      return false;
    }

    // Using the new RSVP method call
    Meteor.call("doRSVP", this.meetup.meetupId , function(error, response) {
      if(error) {
        if(error.reason.code === 'not-a-member') {
          $("#not-a-member-modal").modal("show");
        }
      }
    });
  },

  'submit [data-action=add-topic]': function(event, template) {
    event.preventDefault();

    var params = {
      meetupId: this.meetup._id,
      topicId: $("[name=topicId]").val(),
      presenterId: $("[name=presenterId]").val(),
      customTitle: $("[name=customTitle]").val(),
      customDescription: $("[name=customDescription]").val()
    };

    if (!params.presenterId) {
      alert(TAPi18n.__("Please choose a presenter for this topic!"));
      return;
    }

    if (!params.topicId && !params.customTitle) {
      alert(TAPi18n.__("Please choose a topic or enter a custom topic!"));
      return;
    }

    Meteor.call('addTopicToMeetup', params, function(error) {
      if (error) {
        alert(error);
      } else {
        $("#add-topic-modal").modal("hide");
        $("[name=topicId]").val("");
        $("[name=presenterId]").val("");
        $("[name=customTitle]").val("");
        $("[name=customDescription]").val("");
      }
    });
  }
});
