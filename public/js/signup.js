console.log('connected!');

// Wait for the DOM to be ready
$(function() {
	jQuery.validator.addMethod("domain", function(value, element) {
	  var re = new RegExp(emailDomain + '$');
	  return this.optional(element) || re.test(value);
	}, "Email does not end in: " + emailDomain);

	$("form[name='signup']").validate({
		rules: {
			'subscriber[firstName]': 'required',
			'subscriber[lastName]': 'required',
			'subscriber[email]': {
				required: true,
				email: true,
				domain: true
			},
			email_verify: {
				required: true,
				equalTo: '#email'
			},
			legal: {
				required: true
			}
		},
		messages: {
			email_verify: {
				equalTo: "Email addresses do not match"
			},
			legal: {
				required: "Please accept Terms and Agreements"
			}
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.parent());
		},
		submitHandler: function(form) {
			form.submit();
		}
	});
});
