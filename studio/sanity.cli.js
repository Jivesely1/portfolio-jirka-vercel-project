import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'sjl39asi',   // ← sem vlož své Project ID (z https://www.sanity.io/manage)
    dataset: 'production',   // ← nebo jiné, pokud máš jiné jméno datasetu
  },
})
