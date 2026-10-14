export type Nickname = 'Soni' | 'Mano' | 'Shona' | 'Soni Mano Shona';

export type AppView = 
  | 'scanner'
  | 'surprises_hub'
  | 'bouquet'
  | 'scrapbook'
  | 'letter'
  | 'bubble_popper'
  | 'pamper_bar'
  | 'breathing'
  | 'coupons'
  | 'evict_game'     // NEW: Mehmaan & Bachay Eviction Cannon Mini-Game!
  | 'rage_room'      // NEW: Crockery Smasher & Desi Tantrum Room!
  | 'fir_tribunal'   // NEW: Official FIR against the Mehmaan & Kids!
  | 'excuse_slot';   // NEW: Hilarious Desi Excuse Generator!

export interface SurpriseBox {
  id: 'bouquet' | 'scrapbook' | 'letter';
  title: string;
  subtitle: string;
  tag: string;
  accent: string;
}

export interface LoveCoupon {
  id: string;
  title: string;
  description: string;
  icon: string;
  redeemed: boolean;
}
