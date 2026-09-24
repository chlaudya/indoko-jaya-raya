import type { StructureResolver } from "sanity/structure"

const SINGLETONS = [
  { id: "settings", title: "Site settings" },
  { id: "home", title: "Home" },
  { id: "aboutPage", title: "Tentang Kami" },
  { id: "companyProfile", title: "Profil & Data Perusahaan" },
  { id: "contactPage", title: "Kontak" },
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map((item) =>
        S.listItem()
          .title(item.title)
          .id(item.id)
          .child(S.document().schemaType(item.id).documentId(item.id).title(item.title))
      ),
      S.divider(),
      S.documentTypeListItem("product").title("Products / Commodities"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("job").title("Careers"),
    ])
