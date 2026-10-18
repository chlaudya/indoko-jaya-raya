import { localeString } from "./objects/localeString"
import { localeText } from "./objects/localeText"
import { localeBlock } from "./objects/localeBlock"
import { waCta } from "./objects/waCta"
import { specRow } from "./objects/specRow"
import { trustPoint } from "./objects/trustPoint"
import { seo } from "./objects/seo"
import { pillarTile } from "./objects/pillarTile"
import { statItem } from "./objects/statItem"
import { featureBlock } from "./objects/featureBlock"
import { category } from "./documents/category"
import { product } from "./documents/product"
import { job } from "./documents/job"
import { settings } from "./singletons/settings"
import { home } from "./singletons/home"
import { aboutPage } from "./singletons/aboutPage"
import { companyProfile } from "./singletons/companyProfile"
import { contactPage } from "./singletons/contactPage"

export const schemaTypes = [
  // objects
  localeString,
  localeText,
  localeBlock,
  waCta,
  specRow,
  trustPoint,
  seo,
  pillarTile,
  statItem,
  featureBlock,
  // documents
  category,
  product,
  job,
  // singletons
  settings,
  home,
  aboutPage,
  companyProfile,
  contactPage,
]
