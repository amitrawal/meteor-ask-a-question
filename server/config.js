// first, remove configuration entry in case service is already configured
Accounts.loginServiceConfiguration.remove({
  service: "github"
});

Accounts.loginServiceConfiguration.insert({
  service: "github",
  clientId: "935fe206e55b144ad2ac",
  secret: "e01fd8985311614110dd38f0eac185b2da6f2386"
});