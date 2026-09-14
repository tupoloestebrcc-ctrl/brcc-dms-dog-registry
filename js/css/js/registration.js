document.addEventListener(
  'DOMContentLoaded',
  function () {

    const form =
      document.getElementById(
        'registrationForm'
      );

    const button =
      document.getElementById(
        'submitButton'
      );

    const message =
      document.getElementById(
        'message'
      );


    form.addEventListener(
      'submit',
      async function (event) {

        event.preventDefault();


        message.hidden = true;

        button.disabled = true;

        button.textContent =
          'Submitting...';


        try {

          const data = {

            ownerName:
              document
                .getElementById(
                  'ownerName'
                )
                .value
                .trim(),

            sitio:
              document
                .getElementById(
                  'sitio'
                )
                .value
                .trim(),

            address:
              document
                .getElementById(
                  'address'
                )
                .value
                .trim(),

            contactNumber:
              document
                .getElementById(
                  'contactNumber'
                )
                .value
                .trim(),

            dogName:
              document
                .getElementById(
                  'dogName'
                )
                .value
                .trim(),

            breed:
              document
                .getElementById(
                  'breed'
                )
                .value
                .trim(),

            colorMarkings:
              document
                .getElementById(
                  'colorMarkings'
                )
                .value
                .trim(),

            sex:
              document
                .getElementById(
                  'sex'
                )
                .value,

            birthdate:
              document
                .getElementById(
                  'birthdate'
                )
                .value,

            dogPhotoUrl: '',

            declaration:
              document
                .getElementById(
                  'declaration'
                )
                .checked
                ? 'YES'
                : ''

          };


          const response =
            await fetch(
              BRCC_CONFIG.API_URL,
              {

                method: 'POST',

                headers: {
                  'Content-Type':
                    'text/plain;charset=utf-8'
                },

                body: JSON.stringify({

                  action:
                    'submitRegistration',

                  data: data

                })

              }
            );


          const result =
            await response.json();


          if (!result.success) {

            throw new Error(
              result.message ||
              'Registration failed.'
            );

          }


          message.className =
            'message success';

          message.hidden = false;

          message.innerHTML =

            '<strong>Registration submitted successfully!</strong><br><br>' +

            'Request Number: <strong>' +
            result.requestId +
            '</strong><br>' +

            'Status: <strong>PENDING</strong><br><br>' +

            'Please wait for the Barangay Rabies Control Committee to review your registration.';


          form.reset();


        } catch (error) {

          console.error(error);


          message.className =
            'message error';

          message.hidden = false;

          message.textContent =
            error.message ||
            'Unable to submit registration.';


        } finally {

          button.disabled = false;

          button.textContent =
            'Submit Registration';

        }

      }

    );

  }

);
