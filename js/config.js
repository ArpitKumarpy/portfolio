/* ============================================================================
   WEB3FORMS & SECRETS CONFIGURATION
   Private access keys and secrets — excluded from git version control (.gitignore)
   ============================================================================ */

export const WEB3FORMS_ACCESS_KEY = "d77fd38b-463e-4394-ad04-f14c5f78840c";

// Cryptographic hash digests for Portfolio Studio authentication (Salted SHA-256)
// Kept in this git-ignored file so secrets are never pushed to public repositories
export const STUDIO_AUTH_SALT = "arpit_portfolio_auth_salt_v2_987150_";
export const STUDIO_AUTH_HASHES = [
  "6903faf04900f5dd233378a9382a36ffddd2bb53a52bbdcc40faf8bb80ed717e",
  "46bab93efd35f3c2c0e649ea215ace26d98d282f845c3041bc4dec39e648cbc3"
];
