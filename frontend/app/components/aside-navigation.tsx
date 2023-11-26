import Link from "next/link";

export default function AsideNavigation() {
  const solutionTypes = [
    { label: "Input list of products", href: "/" },
    { label: "Input text of page", href: "/input-page" },
    { label: "Input url of page", href: "/input-url" },
    { label: "Input batch of urls", href: "/batch-urls" },
  ];

  return (
    <aside className="w-1/5 bg-gray-800 p-7 pt-14">
      <h3 className="text-xl font-bold mb-5">Solution types</h3>
      <nav>
        <ul className="font-bold divide-y divide-gray-900">
          {solutionTypes.map((type) => (
            <li className="py-1.5" key={type.href}>
              <Link className="hover:text-teal-500" href={type.href}>{type.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}