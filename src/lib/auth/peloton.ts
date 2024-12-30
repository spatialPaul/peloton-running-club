import { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';

export interface PelotonProfile {
  id: string;
  username: string;
  email: string;
  image_url: string;
}

export default function PelotonProvider(
  options: OAuthUserConfig<PelotonProfile>
): OAuthConfig<PelotonProfile> {
  return {
    id: 'peloton',
    name: 'Peloton',
    type: 'oauth',
    authorization: {
      url: 'https://api.onepeloton.com/auth/oauth/authorize',
      params: { scope: 'read:user read:workout' }
    },
    token: 'https://api.onepeloton.com/auth/oauth/token',
    userinfo: {
      url: 'https://api.onepeloton.com/api/me',
      async request({ client, tokens }) {
        const response = await fetch('https://api.onepeloton.com/api/me', {
          headers: { Authorization: `Bearer ${tokens.access_token}` },
        });
        return await response.json();
      },
    },
    profile(profile) {
      return {
        id: profile.id,
        name: profile.username,
        email: profile.email,
        image: profile.image_url,
      };
    },
    clientId: process.env.PELOTON_CLIENT_ID,
    clientSecret: process.env.PELOTON_CLIENT_SECRET,
  };
}