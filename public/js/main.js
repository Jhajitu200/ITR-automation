document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

function initFreshChat() {
  window.fcWidget.init({
    token: "a4473e1a-a6d1-481b-87c4-b6e789b20ffb",
    tags:["web"],
    host: "https://jjfintax-help.freshchat.com",
    config: {
      open: true,
    }
  });
}
window.fcWidgetMessengerConfig = {
  open: true,
}

function initialize(i, t) {
  var e; i.getElementById(t) ?
    initFreshChat() : ((e = i.createElement("script")).id = t, e.async = !0,
      e.src = "https://jjfintax-help.freshchat.com/js/widget.js", e.onload = initFreshChat, i.head.appendChild(e))
}

window.onload=function initiateCall() {
  setTimeout(function(){
    initialize(document, "Freshchat-js-sdk");
  },3000)
}



window.addEventListener ? window.addEventListener("load", initiateCall, !1) :
  window.attachEvent("load", initiateCall, !1);
/*
const callback = basicLightbox.create(` 
  <div style="padding-left: 0.5rem;padding-right: 0.5rem;">
          <div class="popup" style="background-color: #fcfcfc; border-radius: 4px;padding: 1rem;max-width: 450px;">
            <span style="float: right !important;cursor: pointer;" onclick="callback.close()">
              <svg class="crossSVG" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="height: 0.75rem;">
                <g id="lander" stroke="none" stroke-width="1" fill="#18253f" fill-rule="evenodd">
                    <g id="with-content" transform="translate(-908.000000, -130.000000)" fill="#18253f" fill-rule="nonzero">
                        <g id="close" transform="translate(907.000000, 132.000000)">
                            <path d="M10.7483549,6.66674232 L17.0401562,0.374941027 C17.431059,-0.0156282754 17.431059,-0.649344479 17.0401562,-1.03991378 C16.6492534,-1.43081662 16.0162042,-1.43081662 15.6253014,-1.03991378 L9.3335001,5.25188752 L3.04136527,-1.03991378 C2.65046243,-1.43081662 2.0174133,-1.43081662 1.62651046,-1.03991378 C1.23560762,-0.649344479 1.23560762,-0.0156282754 1.62651046,0.374941027 L7.91864529,6.66674232 L1.62651046,12.9585436 C1.23560762,13.3491129 1.23560762,13.9828291 1.62651046,14.3733984 C1.82196188,14.5685163 2.07811664,14.666242 2.33393787,14.666242 C2.58975909,14.666242 2.84591385,14.5685163 3.04136527,14.3730649 L9.3335001,8.0812636 L15.6253014,14.3730649 C15.8207528,14.5685163 16.0769076,14.666242 16.3327288,14.666242 C16.58855,14.666242 16.8447048,14.5685163 17.0401562,14.3730649 C17.431059,13.9824956 17.431059,13.3487794 17.0401562,12.9582101 L10.7483549,6.66674232 Z" id="Path"></path>
                        </g>
                    </g>
                </g>
            </svg>
            </span>
            <section class="has-text-centered" style="padding: 1rem 1rem;">
              <h2 class="is-size-5" style="font-family: 'Inter', sans-serif; padding: 0.75rem;text-align: center;">
                <strong class="hello" style="font-weight: 700; ">Let's arrange a callback
                </strong>
              </h2>
              <p style="padding: 0.75rem;color: #18253f;">
                  Provide us with your mobile number and we'll arrange a callback soon.
              </p>
            </section>
            <div id="hero-cta" class="has-text-centered">
              <!--Genral Form-->
              <iframe name="hidden_iframe" id="hidden_iframe" style="display:none;" onload="if(submitted)  {window.location='https://www.jjfintax.com/success.html';}"></iframe>
              <form action="https://submit-form.com/9DE6rurr" method="POST" onsubmit="disbtn()">

                  <input type="hidden" name="_redirect" value="https://www.jjfintax.com/success.html" />
                  <input type="hidden" name="_email.subject" value="New Callback Request" />
                  <input type="hidden" name="_email.from" value="JJ Tax Site" />
                  <input type="checkbox" name="_data" style="display:none" tabindex="-1" autocomplete="off" />

                  <div class="control">
                      <input  class="input" type="text" id="name" name="name"aria-label="username" placeholder="Your name here"
                          required="required" />
                  </div>
                  <div class="control" style="padding-top: 0.75rem;">
                      <input name="Mobile_Number" class="input" type="number" aria-label="mobile_number" placeholder="Mobile Number"
                          required="required" min="10" title="Enter valid mobile number">
                  </div>
                  <div class="control" style="padding-top: 0.75rem;">
                      <button type="submit" id="submit_btn" class="button is-primary is-fullwidth has-text-weight-medium">
                          Request Callback
                      </button>
                  </div>
              </form>
              <p class="is-size-7" style="text-align: center; padding-top: 0.25rem; padding-bottom:1.25rem; color: #fcfcfc;">
                We love privacy and sanity.
              </p>
            </div>
          </div>
        </div>
  `);

  const contact = basicLightbox.create(`
  <div style="padding-left: 0.5rem;padding-right: 0.5rem;">
          <div class="popup" style="background-color: #fcfcfc; border-radius: 4px;padding: 1rem;max-width: 450px;">
            <span style="float: right !important;cursor: pointer;" onclick="contact.close()">
              <svg class="crossSVG" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="height: 0.75rem;">
                <g id="lander" stroke="none" stroke-width="1" fill="#18253f" fill-rule="evenodd">
                    <g id="with-content" transform="translate(-908.000000, -130.000000)" fill="#18253f" fill-rule="nonzero">
                        <g id="close" transform="translate(907.000000, 132.000000)">
                            <path d="M10.7483549,6.66674232 L17.0401562,0.374941027 C17.431059,-0.0156282754 17.431059,-0.649344479 17.0401562,-1.03991378 C16.6492534,-1.43081662 16.0162042,-1.43081662 15.6253014,-1.03991378 L9.3335001,5.25188752 L3.04136527,-1.03991378 C2.65046243,-1.43081662 2.0174133,-1.43081662 1.62651046,-1.03991378 C1.23560762,-0.649344479 1.23560762,-0.0156282754 1.62651046,0.374941027 L7.91864529,6.66674232 L1.62651046,12.9585436 C1.23560762,13.3491129 1.23560762,13.9828291 1.62651046,14.3733984 C1.82196188,14.5685163 2.07811664,14.666242 2.33393787,14.666242 C2.58975909,14.666242 2.84591385,14.5685163 3.04136527,14.3730649 L9.3335001,8.0812636 L15.6253014,14.3730649 C15.8207528,14.5685163 16.0769076,14.666242 16.3327288,14.666242 C16.58855,14.666242 16.8447048,14.5685163 17.0401562,14.3730649 C17.431059,13.9824956 17.431059,13.3487794 17.0401562,12.9582101 L10.7483549,6.66674232 Z" id="Path"></path>
                        </g>
                    </g>
                </g>
            </svg>
            </span>
            <section class="has-text-centered" style="padding: 1rem 1rem;">
              <h2 class="is-size-5" style="font-family: 'Inter', sans-serif; padding: 0.75rem;text-align: center;">
                <strong class="hello" style="font-weight: 700; ">Get in touch
                </strong>
              </h2>
              <p class="has-text-left" style="padding: 0.75rem;color: #18253f;">
                  <strong>Mobile No.:</strong> <a href="tel:+91-9310854724" class="footer-link">+91-9310854724</a>
                
                 </p>

                 <p class="has-text-left" style="padding: 0.75rem;color: #18253f;padding-top:0.25rem">
                 
                <strong>Email ID:</strong> <a class="footer-link" href="mailto:contact@jjfintax.com">contact@jjfintax.com</a>
             
                 </p>

                 <p class="has-text-left" style="padding: 0.75rem;color: #18253f;padding-top:0.25rem">
                  
              <strong>Address:</strong> <span class="footer-link">234, Tower B-2, Spaze I Tech Park, Sohna Road, Sector 49, Gurgaon – 122018. Haryana, India</span>
                 </p>
              
            </section>
          </div>
        </div>
  `);


  const career = basicLightbox.create(`
          <div style="padding-left: 0.5rem;padding-right: 0.5rem;">
              <div class="popup" style="background-color: #fcfcfc; border-radius: 4px;padding: 1rem;max-width: 450px;">
                <span style="float: right !important;cursor: pointer;" onclick="career.close()">
                  <svg class="crossSVG" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="height: 0.75rem;">
                    <g id="lander" stroke="none" stroke-width="1" fill="#18253f" fill-rule="evenodd">
                        <g id="with-content" transform="translate(-908.000000, -130.000000)" fill="#18253f" fill-rule="nonzero">
                            <g id="close" transform="translate(907.000000, 132.000000)">
                                <path d="M10.7483549,6.66674232 L17.0401562,0.374941027 C17.431059,-0.0156282754 17.431059,-0.649344479 17.0401562,-1.03991378 C16.6492534,-1.43081662 16.0162042,-1.43081662 15.6253014,-1.03991378 L9.3335001,5.25188752 L3.04136527,-1.03991378 C2.65046243,-1.43081662 2.0174133,-1.43081662 1.62651046,-1.03991378 C1.23560762,-0.649344479 1.23560762,-0.0156282754 1.62651046,0.374941027 L7.91864529,6.66674232 L1.62651046,12.9585436 C1.23560762,13.3491129 1.23560762,13.9828291 1.62651046,14.3733984 C1.82196188,14.5685163 2.07811664,14.666242 2.33393787,14.666242 C2.58975909,14.666242 2.84591385,14.5685163 3.04136527,14.3730649 L9.3335001,8.0812636 L15.6253014,14.3730649 C15.8207528,14.5685163 16.0769076,14.666242 16.3327288,14.666242 C16.58855,14.666242 16.8447048,14.5685163 17.0401562,14.3730649 C17.431059,13.9824956 17.431059,13.3487794 17.0401562,12.9582101 L10.7483549,6.66674232 Z" id="Path"></path>
                            </g>
                        </g>
                    </g>
                </svg>
                </span>
                <section class="has-text-centered" style="padding: 1rem 1rem;">
                  <h2 class="is-size-5" style="font-family: 'Inter', sans-serif; padding: 0.75rem;text-align: center;">
                    <strong class="hello" style="font-weight: 700; ">Come Join JJ Tax
                    </strong>
                  </h2>
                  <p class="is-size-6" style="padding: 0.75rem;color: #18253f;">
                      Choose the role that fits you the best.
                  </p>
                </section>
                <button type="submit" id="submit_btn" class="button is-primary is-fullwidth has-text-weight-medium" onclick="career.close();careersub.show()">
                              Apply for Tax Expert
                </button>
                <button type="submit" id="submit_btn" class="button is-primary is-fullwidth has-text-weight-medium" style="margin-top:1rem;margin-bottom:1rem;" onclick="career.close();careersub.show()">
                              Apply for Tech Intern
                </button>
                <button type="submit" id="submit_btn" class="button is-primary is-fullwidth has-text-weight-medium" onclick="career.close();careersub.show()">
                              Apply for Marketing Expert
                </button>
                <p class="is-size-7 has-text-centered" style="padding-top:0.75rem">Join our company which promotes personal & professional growth.</p>
              </div>
            </div>
          `);


  const careersub = basicLightbox.create(`
  <div style="padding-left: 0.5rem;padding-right: 0.5rem;">
      <div class="popup" style="background-color: #fcfcfc; border-radius: 4px;padding: 1rem;max-width: 450px;">
        <span style="float: right !important;cursor: pointer;" onclick="careersub.close()">
          <svg class="crossSVG" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="height: 0.75rem;">
            <g id="lander" stroke="none" stroke-width="1" fill="#18253f" fill-rule="evenodd">
                <g id="with-content" transform="translate(-908.000000, -130.000000)" fill="#18253f" fill-rule="nonzero">
                    <g id="close" transform="translate(907.000000, 132.000000)">
                        <path d="M10.7483549,6.66674232 L17.0401562,0.374941027 C17.431059,-0.0156282754 17.431059,-0.649344479 17.0401562,-1.03991378 C16.6492534,-1.43081662 16.0162042,-1.43081662 15.6253014,-1.03991378 L9.3335001,5.25188752 L3.04136527,-1.03991378 C2.65046243,-1.43081662 2.0174133,-1.43081662 1.62651046,-1.03991378 C1.23560762,-0.649344479 1.23560762,-0.0156282754 1.62651046,0.374941027 L7.91864529,6.66674232 L1.62651046,12.9585436 C1.23560762,13.3491129 1.23560762,13.9828291 1.62651046,14.3733984 C1.82196188,14.5685163 2.07811664,14.666242 2.33393787,14.666242 C2.58975909,14.666242 2.84591385,14.5685163 3.04136527,14.3730649 L9.3335001,8.0812636 L15.6253014,14.3730649 C15.8207528,14.5685163 16.0769076,14.666242 16.3327288,14.666242 C16.58855,14.666242 16.8447048,14.5685163 17.0401562,14.3730649 C17.431059,13.9824956 17.431059,13.3487794 17.0401562,12.9582101 L10.7483549,6.66674232 Z" id="Path"></path>
                    </g>
                </g>
            </g>
        </svg>
        </span>
        <section class="has-text-centered" style="padding: 1rem 1rem;">
          <h2 class="is-size-5" style="font-family: 'Inter', sans-serif; padding: 0.75rem;text-align: center;">
            <strong class="hello" style="font-weight: 700; ">Come Join JJ Tax
            </strong>
          </h2>
          <p style="padding: 0.75rem;color: #18253f;">
              Provide us with your details and we'll have a look at it soon.
          </p>
        </section>
        <div id="hero-cta" class="has-text-centered">
          <!--Genral Form-->
          <iframe name="hidden_iframe" id="hidden_iframe" style="display:none;" onload="if(submitted)  {window.location='https://www.jjfintax.com/success.html';}"></iframe>
          <form action="https://submit-form.com/dktfg2z3" method="POST" onsubmit="disbtn()">

              <input type="hidden" name="_redirect" value="https://www.jjfintax.com/success.html" />
              <input type="hidden" name="_email.subject" value="New Job Resume" />
              <input type="hidden" name="_email.from" value="JJ Tax Site" />
              <input type="checkbox" name="_data" style="display:none" tabindex="-1" autocomplete="off" />

              <div class="control">
                  <input  class="input" type="text" id="name" name="name" aria-label="username" placeholder="Your name here"
                      required="required" />
              </div>
              <div class="control" style="padding-top: 0.75rem;">
                  <input  class="input" type="email" id="email" name="email" aria-label="username" placeholder="Your email here"
                      required="required" />
              </div>
              <div class="control" style="padding-top: 0.75rem;">
                  <input name="Mobile_Number" class="input" type="number" aria-label="mobile_number" placeholder="Mobile Number"
                      required="required" min="10" title="Enter valid mobile number">
              </div>
              <div class="control" style="padding-top: 0.75rem;">
                  <label for="document">Resume</label>
                  <input
                  type="hidden"
                  id="document"
                  name="document"
                  role="uploadcare-uploader" required="required"
                  data-public-key="c8128b4ef704e7fe2021"
                  />
              </div>
              <div class="control" style="padding-top: 0.75rem;">
                  <button type="submit" id="submit_btn" class="button is-primary is-fullwidth has-text-weight-medium">
                      Request Callback
                  </button>
              </div>
          </form>
          <p class="is-size-7" style="text-align: center; padding-top: 0.25rem; padding-bottom:1.25rem; color: #fcfcfc;">
            We love privacy and sanity.
          </p>
        </div>
      </div>
    </div>
  `);

*/
function chat() {
  Tawk_API.maximize();
}

function disbtn() {
  document.getElementById("submit_btn").disabled = true;
  document.getElementById("submit_btn").innerHTML = "Hold Tight";
}