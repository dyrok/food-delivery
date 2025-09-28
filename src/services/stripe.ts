import { supabase } from '../lib/supabase';
import { stripeProducts } from '../stripe-config';

export interface CheckoutSessionRequest {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  mode: 'payment' | 'subscription';
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export async function createCheckoutSession(
  request: CheckoutSessionRequest
): Promise<CheckoutSessionResponse> {
  const { data: { session }, error: authError } = await supabase.auth.getSession();
  
  if (authError || !session?.access_token) {
    throw new Error('Authentication required');
  }

  const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`;
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to create checkout session');
  }

  return response.json();
}

export async function processCartCheckout(cartTotal: number): Promise<string> {
  try {
    const product = stripeProducts[0]; // Using the food order product
    
    const checkoutSession = await createCheckoutSession({
      priceId: product.priceId,
      successUrl: `${window.location.origin}/order-success`,
      cancelUrl: `${window.location.origin}/cart`,
      mode: product.mode,
    });

    return checkoutSession.url;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
}