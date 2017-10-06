define([
    'jquery',
    'Magento_Catalog/js/price-utils'
], function ($, priceUtils) {
    'use strict';
    $.widget('partpayments.teaser', {
        options: {
            preselected_amount: 20,
            css_price_selector: '.price',
            css_dest_selector: ''
        },

        drawFrom: function () {
            var self = this;
            if (typeof window.Sequra === 'undefined') {
                setTimeout(self.drawFrom, 100);
                return;
            }
            var partPaymnetTeaser = new SequraPartPaymentTeaser(
                {
                    container: '#' + self.element.attr('id'),
                    price_container: self.options.css_price_selector
                }
            );
            partPaymnetTeaser.draw();
            partPaymnetTeaser.preselect(self.options.preselected_amount);
            if ($(self.options.css_dest_selector)) {
                $(self.options.css_dest_selector).after($('#' + self.element.attr('id')));
            }
        },

        _create: function () {
            this.drawFrom();
        }
    });

    return $.partpayments.teaser;
});