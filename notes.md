# MVP
* Add invite email support - Done
* Add 404 route - Done

# DONE

* Make twilio auth work - Done
* Make app functions modular - Done
* Create and edit administrators - Done

#  VERSION 2

* Comment code
* Add validation for entering bikes and users
* Clean up design
* Add settings in admin panel
* Add flash messages
* Add data analysis
* Generate appSecret on seed
* Abstract client fully
* Regenerate validation code to change phone #
* Message admin on error
* Improve validation codes - plain english + a number, like heroku
* Phone email links


ask Chad about /invite/all or /inviteall (collision with /invite/:id)


# Documentation to add

- Email address

- Mlab
	- Make a new database
	- Make a new user
	- Setup database on heroku

- Mailgun
	- Change to secret API key?
	- https://mailgun.com/app/domains/bikeshare.wta-tma.org

- Github

	authorize heroku in github

- Heroku
	- https://devcenter.heroku.com/articles/custom-domainss
	- Setup environment variables in heroku

- Twilio

# Regex Parsing:

/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(domain.com)$/
