$(document).ready(function() {
  $('.all_contacts').hide();
  $('.add_contact').hide();
  $('.search_contacts').hide();
  $('.find_contact').hide();
  $('.update_contact').hide();
  $('.remove_contact').hide();
  $('#all').removeClass('active')
  var view = $('.home')
  var highlight = $('#all')

  $('#all').on('click', function(e) {
    view.hide();
    $('#contact-table-results tbody').html('');
    $('.all_contacts').show();
    $('#all').addClass('active');
    view = $('.all_contacts');
    highlight.removeClass('active');
    highlight = $('#all');
    // e.preventDefault();
    // e.stopPropagation();
    showContacts();
  });

  $('#new').on('click', function() {
    if ($('#new').hasClass('showForm')) {
      removeMessage();
      $('#new').removeClass('showForm');
      $('#add_cont').trigger("reset"); 
    } else {
      view.hide();
      $('.add_contact').show();
      $('#new').addClass('active');
      view = $('.add_contact');
      highlight.removeClass('active');
      highlight = $('#new');    
      $('#addContact').on('click', function(e){
        $('#new').addClass('showForm');
        e.preventDefault();
        e.stopPropagation();
        getContactList();
        addMessage();
      });
    };
  });

  $('#search').on('click', function() {
    view.hide();
    $('.search_contacts').show();
    $('#search_contact-table-results').hide();
    $('#search').addClass('active');
    view = $('.search_contacts');
    highlight.removeClass('active');
    highlight = $('#search');
    $('#searchNow').on('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      $('#search_contact-table-results').show();
      searchCont();
    })
  });

  $('#find').on('click', function() {
    if ($('#find').hasClass('showForm')) {
      $('#find').removeClass('showForm');
      $('#f_form').trigger("reset");
      $('#find_contact-table-results').hide();
    } else {
      view.hide();
      $('#find_contact-table-results tbody').html('');
      $('#find_contact-table-results').hide();
      $('.find_contact').show();
      $('#find').addClass('active');
      view = $('.find_contact');
      highlight.removeClass('active');
      highlight = $('#find');
      $('#findCon').on('click', function(){
        $('#find_contact-table-results').show();
        $('#find').addClass('showForm');
        // e.preventDefault();
        // e.stopPropagation();
        findCont();
      });
    }
  });

  $('#update').on('click', function() {
    if ($('#update').hasClass('showForm')) {
      removeUpMessage();
      $('#update').removeClass('showForm');
      $('#update_cont').trigger("reset");
    } else {
      view.hide();
      $('.update_contact').show();
      $('#update').addClass('active');
      view = $('.update_contact');
      highlight.removeClass('active');
      highlight = $('#update');
      $('#updateCon').on('click', function(e){
        $('#update').addClass('showForm');
        e.preventDefault();
        e.stopPropagation();
        updateContactList()
        addUpMessage();
      });
    };
  });




  $('#remove').on('click', function() {
    if ($('#remove').hasClass('showForm')) {
      removeDelMessage();
      $('#remove').removeClass('showForm');
      $('#del').trigger("reset");
    } else {
      view.hide();
      $('.remove_contact').show();
      $('#remove').addClass('active');
      view = $('.remove_contact');
      highlight.removeClass('active');
      highlight = $('#remove');
      $('#deleteCon').on('click', function(e){
        addDelMessage();
        $('#remove').addClass('showForm');
        deleteCont();

      })
    }
  });

//////////////////////////////////////////////////////
  function getContactList() {
    var values = {};
    $.each($("#add_cont").serializeArray(),
      function (i, field) {
        values[field.name] = field.value;
      });
    $.ajax({
      url: '/contacts/new',
      method: 'POST',
      data: values,
      dataType: 'json'
     // headers: { 'Authorization': "TOKEN " + API_KEY }
    });
  }

  function updateContactList() {
    var con_up_id = $('#findUpId').val()
    var valuesUp = {};
    $.each($("#update_cont").serializeArray(),
      function (i, field) {
        valuesUp[field.name] = field.value;
      });
    $.ajax({
      url: '/contacts/'+con_up_id,
      method: 'PUT',
      data: valuesUp,
      dataType: 'json'
    });
  }

  function addUpMessage() {
    $('#update_cont').hide();
    $('.form-group .upMsg').append('<p> You Successfully Updated Your Contact :)</p>');
  }

  function removeUpMessage() {
    $('#update_cont').show();
    $('.form-group .upMsg').html('');
  }


  function addMessage() {
    $('#add_cont').hide();
    $('.mesg').append('<p> You Successfully Created A New Contact :)</p>');
  }

  function removeMessage() {
    $('#add_cont').show();
    $('.mesg').html('');
  }

  function addDelMessage() {
    $('#removeMsg').append('<p> You Successfully Deleted Your Contact.');
  }

  function removeDelMessage() {
    $('#removeMsg').html('');
  }





  // var contactTemplate = _.template($('#contact-template').html());

  function showContacts() {
    $.ajax({url: '/contacts',
      method: 'GET',
      dataType: 'json'}).then(function(data){
      for(var i = 0; i < data.length; i++) {
        var contact = data[i];
        var output = (
          '<tr><td>'+contact.id+'</td><td>'+contact.first_name+'</td><td>'+contact.last_name+'</td><td>'+contact.email+'</td></tr>')
        $('#contact-table-results tbody').append(output);
      };
    });
  };

  function findCont() {
    var con_id = $('#findId').val()
    $('#find_contact-table-results tbody').html('');
    $.ajax({
      url: '/contacts/'+con_id,
      method: 'GET',
      dataType: 'json'
    }).then(function(data){
        var output = (
          '<tr><td>'+data.id+'</td><td>'+data.first_name+'</td><td>'+data.last_name+'</td><td>'+data.email+'</td></tr>');
        $('#find_contact-table-results tbody').append(output);
    });
  }

  function searchCont() {
    var search_term = {search_t: $('#searchInput').val()}
    $('#search_contact-table-results tbody').html('');
    $.ajax({
      url: '/contacts/search',
      method: 'GET',
      data: search_term,
      dataType: 'json'
    }).then(function(data){
        for(var i = 0; i < data.length; i++) {
        var contact = data[i];
        var output = (
          '<tr><td>'+contact.id+'</td><td>'+contact.first_name+'</td><td>'+contact.last_name+'</td><td>'+contact.email+'</td></tr>')
        $('#search_contact-table-results tbody').append(output);
      };
    });
  }

  function deleteCont() {
    var con_del_id = $('#idDel').val()
    $.ajax({
      url: '/contacts/'+con_del_id,
      method: 'DELETE',
      dataType: 'json'
    });

  }


    // $('#add_cont').hide();
    // $('.form-group').append('<p> You Successfully Created A New Contact :)</p>');

        //// Parse result into the webpage
        // for(var i = 0; i < data.length; i++) {
        //   var contact = data[i];
        //   var output = contactTemplate({
        //     first_name: contact.first_name,
        //     last_name: contact.last_name,
        //     email: contact.email,
        //   });

        //   $('#contact-table-results tbody').append(output);
        // }


      // });   
  






  // var contactTemplate = _.template($('#contact-template').html());

  // function getContactList() {  //(name)
  //   $.ajax({
  //     url: '/contacts/search',
  //     data: {q: name},
  //     method: 'GET',
  //    // headers: { 'Authorization': "TOKEN " + API_KEY }
  //   }).then(function(data) {
  //     // Parse result into the webpage
  //     for(var i = 0; i < data.length; i++) {
  //       var contact = data[i];
  //       var output = contactTemplate({
  //         first_name: contact.first_name,
  //         last_name: contact.last_name
  //         email: contact.email,
  //       });

  //       $('#contact-table-results tbody').append(output);
  //     }

  //   });
  // }

  // $(document).ready(function() {

  //   // Form subsmission event

  //   $('#searchNow').on('click', _.debounce(function(event) {
  //     var input = $('#searchNow').closest.find('#searchInput').val();
  //     $('#contact-table-results tbody').html('');
  //     getBeerList(input);
  //   }, 1000));
  //   // Get results














  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
