import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import getStripe from '../lib/getStripe';
import { toast } from 'react-hot-toast';

export default function Cart() {
  const cartWrapRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    onRemove,
    toggleCartItemQuantity,
    paymentProcessing,
    setPaymentProcessing,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();
    toast.loading('Redirecting...');
    stripe.redirectToCheckout({ sessionId: data.id });
    setPaymentProcessing(false);
  };

  return (
    <div className='cart-wrapper' onClick={() => setShowCart(false)}>
      <div
        className='cart-container'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          type='button'
          className='cart-heading'
          onClick={(e) => {
            e.stopPropagation();
            setShowCart(false);
          }}
        >
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href='/'>
              <button
                type='button'
                className='btn'
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCart(false);
                }}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className='product' key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className='cart-product-image'
                />
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>

                  <div className='flex bottom'>
                    <div>
                      <p className='quantity-desc'>
                        <span
                          className='minus'
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCartItemQuantity(item._id, 'dec');
                          }}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className='num'>{item.quantity}</span>
                        <span
                          className='plus'
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCartItemQuantity(item._id, 'inc');
                          }}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>

                    <button
                      type='button'
                      className='remove-item'
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(item._id);
                      }}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button
                type='button'
                className={`btn${paymentProcessing ? ' btn-disabled' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setPaymentProcessing(true);
                  handleCheckout();
                }}
                disabled={paymentProcessing}
              >
                {paymentProcessing ? 'Processing...' : 'Pay with Stripe'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

