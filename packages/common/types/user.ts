export type User = {
  mutedUsers: string[];
  mutedChannels: string[];
  mutedWords: string[];
  metadata?: UserMetadata;
  actions: CastActionInstall[];
};

export type UserMetadata = {
  enableDegenTip?: boolean;
  order?: [string, string[]][];
  colorSchemeOverride?: "light" | "dark" | null;
};

export type CastActionInstall = {
  index: number;
  action: CastAction;
};

export type Session = {
  id: string;
  fid: string;
  token: string;
  refreshToken: string;
  expiresAt: number;
  theme?: string;
};

export type CastAction = {
  actionType: string;
  postUrl: string;
  name: string;
  icon: string;
  description?: string;
  aboutUrl?: string;
};

export type UserSettings = {
  theme: string;
  mutedUsers: string[];
  mutedChannels: string[];
  mutedWords: string[];
  actions: CastActionInstall[];
  notifications?: {
    disabled: boolean;
    receive: boolean;
    onlyPowerBadge: boolean;
  };
};
