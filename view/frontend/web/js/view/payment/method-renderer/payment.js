/**
 * Copyright © 2017 SeQura Engineering. All rights reserved.
 */
/*browser:true*/
/*global define*/
define(
    [
        'Magento_Checkout/js/view/payment/default',
        'Sequra_Partpayments/js/action/set-payment-method',
        'Magento_Checkout/js/model/payment/additional-validators'
    ],
    function (Component, setPaymentMethodAction, additionalValidators) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'Sequra_Partpayments/payment/form'
            },

            initObservable: function () {
                this._super();
                /*    .observe([
                        'transactionResult'
                    ]);*/
                return this;
            },

            getCode: function() {
                return 'sequra_partpayments';
            },

            getData: function() {
                return {
                    'method': this.item.method,
                    /*'additional_data': {
                        'transaction_result': this.transactionResult()
                    }*/
                };
            },

            showSequraForm: function () {
               if (additionalValidators.validate()) {
                   //update payment method information if additional data was changed
                   this.selectPaymentMethod();
                   setPaymentMethodAction(this.messageContainer);
                   return false;
               }
            },
        });
    }
);