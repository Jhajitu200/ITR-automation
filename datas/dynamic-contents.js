var tickers = [
        { "key" : "Confused about which regime to choose? Calculate minimum Tax on our TAX CALCULATOR in Tools."},
        { "key" : "Stay informed with our latest financial insights in the new Blogs section."},
        { "key" : "BOOK A CALL NOW with our tax experts for consultation! 📞"},
        { "key" : "Need to make a big ticket purchase but unsure about the EMI? Use our EMI Calculator in Tools."},
        { "key" : "Are you Financially Fit? Chat now to know your Status."},
        { "key" : "Discover your HRA deduction with our easy-to-use calculator in Tools."},
        { "key" : "Want to know your TDS and take home Salary.Try our calculator in Tools for accurate results."},
        { "key" : "ITR for the FY 2023-24 has been released."},
        { "key" : "Self file your ITR for FY 23-24 absolutely FREE with India's Most Trusted App." },
        { "key" : "Rebate limit under the New Tax Regime increased to Rs. 7 lakhs w.e.f. FY 2023-24." },    
        { "key" : "20%* TCS applicable from 1st October'23." },
        { "key" : "Tax season is here. Chat now with our tax expert and file your ITR." },
        { "key" : "Are you willing to make a WILL? Contact our legal team today." },
        { "key" : "Use our tax calculator and choose the best regime for you." },
        { "key" : "Book a call with our tax expert." },
        { "key" : "Read our latest blogs." },
        { "key" : "We are adding international taxation to our services." },
        { "key" : "JJ Tax app is now on the Samsung Galaxy Store. Download now!" },
        { "key" : "Deadline extended to add Nominees in Demat and MF Accounts to June 30, 2024." },
        { "key" : "Invest in NPS and secure your future." },
        { "key" : "Investment partner: BAJAJ CAPITAL." },
        { "key" : "ZERO</b> tax on income of Rs. 10 lakhs*, plan your investments with JJ Tax.." },
        { "key" : "101</b> ways to save your taxes LEGALLY. Ask us!" },
        { "key" : "Save <b>80%</b> of your cost. Outsource your Accounting to JJ Tax." },
        { "key" : "Now chat in Hindi with our Tax Experts." },
        { "key" : "अब पाए हर TAX से जुड़े सवाल का जवाब हिंदी में।" },
        { "key" : "जेजे टैक्स ऐप पर 24/7 चैट करे।" },
        { "key" : "We are a women empowered startup, invest and join our journey." },
        { "key" : "Awarded with the Best Fintech Solution of the year." },
    ];

    
    var contactModal = "<div class='modal fade' id='contactmodal' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true' style='display: none;'><div class='modal-dialog modal-dialog-centered'><div class='modal-content'><div class='modal-header'><h1 class='modal-title fs-5'>Get In Touch</h1><button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button></div><div class='modal-body modal-padding'><form><div class='mb-3'>Mobile No : +91-9310854724</div><div class='mb-3'>EMail ID : contact@jjfintax.com</div><div class='mb-3'>Address : 234, Tower B-2, Spaze I Tech Park, <br>Sohna Road, Sector 49, Gurgaon - 122018, Haryana, India</div></form></div></div></div></div>";

    // window.onload= function () {
    //     function isMobileParameterTrue() {
    //         const urlParams = new URLSearchParams(window.location.search);
    //         return urlParams.get('mobile') === 'true';
    //     }
    //     function checkIfUrlIsRedirectedFromMobile() {
        
    //     if (isMobileParameterTrue()) {
    //         console.log('The mobile parameter is set to true.');
    //         const elements = document.getElementsByClassName('navbar');
    //         console.log("The elements",elements,"--",elements[0])
    //             elements[0].style.display = 'none';
    //     } else {
    //         console.log('The mobile parameter is not set to true.');
    //     }
    // }
    // checkIfUrlIsRedirectedFromMobile();
    // };
    $(document).ready(function(){
        function addBookACallOption() {
            
            var callOptionDiv = $('<div></div>')
                .addClass('call-option')
                .html('<span>Book a Call with an expert absolutely <strong>FREE</strong> for 15 minutes</span><a href="https://calendar.app.google/xKYfFw94XsqAZQXy5" target="_blank"><button>Book Call</button></a>');
            
            $('.ticker-wrapper-h').after(callOptionDiv);
            $('<style>')
                .prop('type', 'text/css')
                .html(`
                    .call-option {
                        padding: 10px;
                        background-color: #E6F4F7;
                        border: 1px solid #ccc;
                        text-align: center;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .call-option span {
                        font-weight: bold;
                        font-size: 1.8em;
                        margin-right: 10px;
                    }
                    .call-option a {
                        text-decoration: none; /* Remove underline from the link */
                    }
                    .call-option button {
                        padding: 2px 20px;
                        background: linear-gradient(180deg, #1167AF,#6AA9D5);
                            border: 1px solid #ccc;
                        color: #fff;
                        border-radius:5px;
                        cursor: pointer;
                        font-size: 1.5em;
                    }
                    .call-option button:hover {
                        background-color: #0056b3;
                    }
    
                    @media screen and (max-width: 768px) {
                        .call-option {
                            flex-direction: column;
                        }
                        .call-option span {
                            margin-bottom: 10px;
                        }
                    }
                `)
                .appendTo('head');
        }
    
        addBookACallOption();
    });
