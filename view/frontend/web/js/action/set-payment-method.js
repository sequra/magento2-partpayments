/**
 * Copyright © 2017 SeQura Engineering. All rights reserved.
 */
define(
    [
        'jquery',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/model/url-builder',
        'mage/url',
        'mage/storage',
        'Magento_Checkout/js/model/error-processor',
        'Magento_Customer/js/model/customer',
        'Magento_Checkout/js/model/full-screen-loader'
    ],
    function ($, quote, urlBuilder, url, storage, errorProcessor, customer, fullScreenLoader) {
        'use strict';

        return function (messageContainer) {
            var serviceUrl,
                payload,
                method = 'put',
                paymentData = quote.paymentMethod(),
                ShowSequraForm = function () {
                    if (typeof window.SequraFormInstance === 'undefined') {
                        setTimeout(ShowSequraForm, 100);
                        return;
                    }
                    window.SequraFormInstance.setCloseCallback(function () {
                        fullScreenLoader.stopLoader();
                        window.SequraFormInstance.defaultCloseCallback();
                    });
                    window.SequraFormInstance.setElement("sq-identification-pp3");
                    window.SequraFormInstance.show();
                };

            /**
             * Checkout for guest and registered customer.
             */
            if (!customer.isLoggedIn()) {
                serviceUrl = urlBuilder.createUrl('/guest-carts/:cartId/set-payment-information', {
                    cartId: quote.getQuoteId()
                });
                payload = {
                    cartId: quote.getQuoteId(),
                    email: quote.guestEmail,
                    paymentMethod: paymentData
                };
                method = 'post';
            } else {
                serviceUrl = urlBuilder.createUrl('/carts/mine/selected-payment-method', {});
                payload = {
                    cartId: quote.getQuoteId(),
                    method: paymentData
                };
            }
            fullScreenLoader.startLoader();

            return storage[method](
                serviceUrl, JSON.stringify(payload)
            ).done(
                function () {
                    serviceUrl = urlBuilder.createUrl('/sequra_core/Submission',{});
                    storage.get(serviceUrl).done(
                        function (response) {
                            $('[id^="sq-identification"]').remove();
                            $('body').append(response);
                            ShowSequraForm();
                        }
                    ).fail(
                        function (response) {
                            errorProcessor.process(response, messageContainer);
                            fullScreenLoader.stopLoader();
                        }
                    );
                }
            ).fail(
                function (response) {
                    errorProcessor.process(response, messageContainer);
                    fullScreenLoader.stopLoader();
                }
            );
        };
    }
);