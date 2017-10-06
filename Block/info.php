<?php
/**
 * Copyright © 2017 SeQura Engineering. All rights reserved.
 */

namespace Sequra\Partpayments\Block;

use Magento\Framework\Phrase;
use Magento\Payment\Block\ConfigurableInfo;
//@TODO: Do we really need this?
class Info extends ConfigurableInfo {
	/**
	 * Returns label
	 *
	 * @param string $field
	 *
	 * @return Phrase
	 */
	protected function getLabel( $field ) {
		return __( $field );
	}
}
