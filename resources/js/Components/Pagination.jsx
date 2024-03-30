import {Link} from "@inertiajs/react";

export default function Pagination({links}) {
  return (
    <nav className={"text-center mt-4"}>
      {links.map(link => (
        <Link key={link.label} href={link.url}
              preserveScroll={true}
              dangerouslySetInnerHTML={{__html: link.label}}
              className={"inline-block py-2 px-3 m-2 rounded-lg text-gray-200 text-sm" +
                (link.active ? " bg-gray-950" : " ") +
                (!link.url ? " !text-gray-500 cursor-not-allowed" : " hover:bg-gray-950")

              }>

        </Link>
      ))}
    </nav>
  )
}
