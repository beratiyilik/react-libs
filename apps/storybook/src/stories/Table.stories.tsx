import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TableOptions } from "@beratiyilik/react-table";
import { Table } from "@beratiyilik/react-table";

type User = {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  status: string;
};

const data: User[] = [
  {
    id: "1",
    name: "Berat Iyilik",
    role: "Engineer",
    department: "Platform",
    location: "San Jose",
    status: "Active",
  },
  {
    id: "2",
    name: "Gheorghe Hagi",
    role: "Engineer",
    department: "Platform",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "3",
    name: "Metin Oktay",
    role: "Manager",
    department: "Operations",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "4",
    name: "Turgut Özal",
    role: "Manager",
    department: "Finance",
    location: "Ankara",
    status: "Inactive",
  },
  {
    id: "5",
    name: "Mustafa Kemal Atatürk",
    role: "Manager",
    department: "Operations",
    location: "Ankara",
    status: "Active",
  },
  {
    id: "6",
    name: "Yunus Emre",
    role: "Designer",
    department: "Product",
    location: "Eskişehir",
    status: "Active",
  },
  {
    id: "7",
    name: "Nazım Hikmet",
    role: "Designer",
    department: "Product",
    location: "Istanbul",
    status: "Inactive",
  },
  {
    id: "8",
    name: "Orhan Pamuk",
    role: "Analyst",
    department: "Product",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "9",
    name: "Yaşar Kemal",
    role: "Analyst",
    department: "Product",
    location: "Adana",
    status: "Active",
  },
  {
    id: "10",
    name: "Fatih Sultan Mehmet",
    role: "Manager",
    department: "Operations",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "11",
    name: "Mimar Sinan",
    role: "Engineer",
    department: "Infrastructure",
    location: "Kayseri",
    status: "Active",
  },
  {
    id: "12",
    name: "Piri Reis",
    role: "Analyst",
    department: "Platform",
    location: "Gelibolu",
    status: "Active",
  },
  {
    id: "13",
    name: "Ali Kuşçu",
    role: "Engineer",
    department: "Platform",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "14",
    name: "Katip Çelebi",
    role: "Analyst",
    department: "Finance",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "15",
    name: "Evliya Çelebi",
    role: "Designer",
    department: "Product",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "16",
    name: "Fuzuli",
    role: "Designer",
    department: "Product",
    location: "Karbala",
    status: "Inactive",
  },
  {
    id: "17",
    name: "Baki",
    role: "Designer",
    department: "Product",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "18",
    name: "Nedim",
    role: "Designer",
    department: "Product",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "19",
    name: "Ahmet Haşim",
    role: "Designer",
    department: "Product",
    location: "Baghdad",
    status: "Inactive",
  },
  {
    id: "20",
    name: "Tevfik Fikret",
    role: "Designer",
    department: "Product",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "21",
    name: "Ziya Gökalp",
    role: "Analyst",
    department: "HR",
    location: "Diyarbakır",
    status: "Active",
  },
  {
    id: "22",
    name: "Halide Edib Adıvar",
    role: "Manager",
    department: "HR",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "23",
    name: "Sabahattin Ali",
    role: "Designer",
    department: "Product",
    location: "Edirne",
    status: "Inactive",
  },
  {
    id: "24",
    name: "Ahmet Hamdi Tanpınar",
    role: "Analyst",
    department: "Product",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "25",
    name: "Sait Faik Abasıyanık",
    role: "Designer",
    department: "Product",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "26",
    name: "Cemal Süreya",
    role: "Designer",
    department: "Product",
    location: "Erzincan",
    status: "Inactive",
  },
  {
    id: "27",
    name: "Can Yücel",
    role: "Designer",
    department: "Product",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "28",
    name: "Attila İlhan",
    role: "Analyst",
    department: "Product",
    location: "Izmir",
    status: "Active",
  },
  {
    id: "29",
    name: "Peyami Safa",
    role: "Analyst",
    department: "Product",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "30",
    name: "Reşat Nuri Güntekin",
    role: "Designer",
    department: "Product",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "31",
    name: "Falih Rıfkı Atay",
    role: "Analyst",
    department: "HR",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "32",
    name: "İbrahim Tatlıses",
    role: "Designer",
    department: "Product",
    location: "Şanlıurfa",
    status: "Active",
  },
  {
    id: "33",
    name: "Barış Manço",
    role: "Designer",
    department: "Product",
    location: "Bursa",
    status: "Inactive",
  },
  {
    id: "34",
    name: "Zeki Müren",
    role: "Designer",
    department: "Product",
    location: "Bursa",
    status: "Inactive",
  },
  {
    id: "35",
    name: "Münir Nurettin Selçuk",
    role: "Designer",
    department: "Product",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "36",
    name: "Cem Karaca",
    role: "Designer",
    department: "Product",
    location: "Istanbul",
    status: "Inactive",
  },
  {
    id: "37",
    name: "Zülfü Livaneli",
    role: "Designer",
    department: "Product",
    location: "Isparta",
    status: "Active",
  },
  {
    id: "38",
    name: "Sezen Aksu",
    role: "Designer",
    department: "Product",
    location: "Denizli",
    status: "Active",
  },
  {
    id: "39",
    name: "Timur Selçuk",
    role: "Designer",
    department: "Product",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "40",
    name: "Ara Güler",
    role: "Designer",
    department: "Product",
    location: "Istanbul",
    status: "Inactive",
  },
  {
    id: "41",
    name: "Ferit Şahenk",
    role: "Analyst",
    department: "Finance",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "42",
    name: "Aydın Doğan",
    role: "Manager",
    department: "Finance",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "43",
    name: "Sakıp Sabancı",
    role: "Manager",
    department: "Finance",
    location: "Adana",
    status: "Inactive",
  },
  {
    id: "44",
    name: "Vehbi Koç",
    role: "Manager",
    department: "Finance",
    location: "Ankara",
    status: "Inactive",
  },
  {
    id: "45",
    name: "Eczacıbaşı Nejat",
    role: "Manager",
    department: "Finance",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "46",
    name: "Ronnie Vlaar",
    role: "Engineer",
    department: "Infrastructure",
    location: "Rotterdam",
    status: "Inactive",
  },
  {
    id: "47",
    name: "Didier Drogba",
    role: "Engineer",
    department: "Platform",
    location: "Abidjan",
    status: "Inactive",
  },
  {
    id: "48",
    name: "Wesley Sneijder",
    role: "Engineer",
    department: "Platform",
    location: "Utrecht",
    status: "Inactive",
  },
  {
    id: "49",
    name: "Filippo Inzaghi",
    role: "Engineer",
    department: "Platform",
    location: "Piacenza",
    status: "Inactive",
  },
  {
    id: "50",
    name: "Jardel",
    role: "Engineer",
    department: "Platform",
    location: "Fortaleza",
    status: "Inactive",
  },
  {
    id: "51",
    name: "Hakan Ünsal",
    role: "Engineer",
    department: "Platform",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "52",
    name: "Ergün Penbe",
    role: "Engineer",
    department: "Infrastructure",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "53",
    name: "Bülent Korkmaz",
    role: "Manager",
    department: "Operations",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "54",
    name: "Gökhan Keskin",
    role: "Engineer",
    department: "Platform",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "55",
    name: "Mauro Icardi",
    role: "Engineer",
    department: "Platform",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "56",
    name: "Tugay Kerimoğlu",
    role: "Engineer",
    department: "Platform",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "57",
    name: "Emre Aşık",
    role: "Engineer",
    department: "Infrastructure",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "58",
    name: "Okan Buruk",
    role: "Manager",
    department: "Operations",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "59",
    name: "Suat Kaya",
    role: "Engineer",
    department: "Platform",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "60",
    name: "Ümit Davala",
    role: "Engineer",
    department: "Platform",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "61",
    name: "Cüneyt Özdemir",
    role: "Analyst",
    department: "HR",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "62",
    name: "Hasan Şaş",
    role: "Engineer",
    department: "Platform",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "63",
    name: "Servet Çetin",
    role: "Engineer",
    department: "Infrastructure",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "64",
    name: "Sabri Sarıoğlu",
    role: "Engineer",
    department: "Platform",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "65",
    name: "Arda Turan",
    role: "Engineer",
    department: "Platform",
    location: "Istanbul",
    status: "Active",
  },
  {
    id: "66",
    name: "Kewell Harry",
    role: "Engineer",
    department: "Platform",
    location: "Melbourne",
    status: "Inactive",
  },
  {
    id: "67",
    name: "Nicolás Olivera",
    role: "Engineer",
    department: "Platform",
    location: "Montevideo",
    status: "Inactive",
  },
  {
    id: "68",
    name: "Franck Ribéry",
    role: "Engineer",
    department: "Platform",
    location: "Boulogne",
    status: "Inactive",
  },
  {
    id: "69",
    name: "Dries Mertens",
    role: "Engineer",
    department: "Platform",
    location: "Leuven",
    status: "Active",
  },
  {
    id: "70",
    name: "Radamel Falcao",
    role: "Engineer",
    department: "Platform",
    location: "Santa Marta",
    status: "Active",
  },
  {
    id: "71",
    name: "Ryan Babel",
    role: "Engineer",
    department: "Infrastructure",
    location: "Amsterdam",
    status: "Active",
  },
  {
    id: "72",
    name: "Younès Belhanda",
    role: "Analyst",
    department: "Finance",
    location: "Avignon",
    status: "Active",
  },
  {
    id: "73",
    name: "Sofiane Feghouli",
    role: "Engineer",
    department: "Platform",
    location: "Levallois",
    status: "Active",
  },
  {
    id: "74",
    name: "Nacer Chadli",
    role: "Engineer",
    department: "Infrastructure",
    location: "Liège",
    status: "Inactive",
  },
  {
    id: "75",
    name: "Victor Osimhen",
    role: "Engineer",
    department: "Platform",
    location: "Istanbul",
    status: "Active",
  },
];

const baseOptions: TableOptions<User> = {
  name: "Users",
  identifier: "id",
  fieldOptions: [
    { fieldName: "name", headerName: "Name", sortable: true, filterable: true },
    { fieldName: "role", headerName: "Role", sortable: true, filterable: true },
    { fieldName: "department", headerName: "Department", sortable: true, filterable: true },
    { fieldName: "location", headerName: "Location", sortable: true, filterable: true },
    { fieldName: "status", headerName: "Status", sortable: true, filterable: true },
  ],
};

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A fully-featured data table built on `@beratiyilik/react-components`. Supports sorting, filtering, search (Fuse.js), pagination, and row selection. Accepts a generic `data` array and a `TableOptions` config object.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: "Basic table with sort and filter enabled on all columns." },
    },
  },
  render: () => <Table options={baseOptions} data={data} />,
};

export const WithSearch: Story = {
  parameters: {
    docs: {
      description: { story: "Full-text search via Fuse.js across all rows." },
    },
  },
  render: () => <Table options={{ ...baseOptions, searchable: true }} data={data} />,
};

export const WithPagination: Story = {
  parameters: {
    docs: {
      description: { story: "Paginated table — rows split across pages." },
    },
  },
  render: () => <Table options={{ ...baseOptions, pagination: true }} data={data} />,
};

export const WithSearchAndPagination: Story = {
  parameters: {
    docs: {
      description: { story: "Search and pagination combined." },
    },
  },
  render: () => (
    <Table options={{ ...baseOptions, searchable: true, pagination: true }} data={data} />
  ),
};

export const WithSelection: Story = {
  parameters: {
    docs: {
      description: { story: "Row selection via checkbox column." },
    },
  },
  render: () => (
    <Table
      options={{
        ...baseOptions,
        fieldOptions: [
          { fieldName: "id", selection: true, selectionIdentifier: "id" },
          ...baseOptions.fieldOptions,
        ],
      }}
      data={data}
    />
  ),
};

export const Empty: Story = {
  parameters: {
    docs: {
      description: { story: "Empty state — no rows provided." },
    },
  },
  render: () => <Table options={baseOptions} data={[]} />,
};
