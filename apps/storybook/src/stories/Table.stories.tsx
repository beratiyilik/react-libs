import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TableOptions } from "@beratiyilik/react-table";
import { Table } from "@beratiyilik/react-table";
import { users, type User } from "./data/users.js";

const baseOptions: TableOptions<User> = {
  name: "Users",
  identifier: "id",
  fieldOptions: [
    { fieldName: "name", headerName: "Name", sortable: true, filterable: true },
    { fieldName: "role", headerName: "Role", sortable: true, filterable: true },
    { fieldName: "department", headerName: "Department", sortable: true, filterable: true },
    { fieldName: "location", headerName: "Location", sortable: true, filterable: true },
    { fieldName: "status", headerName: "Status", sortable: true, filterable: true },
    { fieldName: "email", headerName: "Email", sortable: false, filterable: false },
    { fieldName: "joinDate", headerName: "Join Date", sortable: true, filterable: false },
    { fieldName: "salary", headerName: "Salary", sortable: true, filterable: false },
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
    docs: { description: { story: "Basic table with sort and filter enabled on all columns." } },
  },
  render: () => <Table options={baseOptions} data={users} />,
};

export const WithSearch: Story = {
  parameters: {
    docs: { description: { story: "Full-text search via Fuse.js across all rows." } },
  },
  render: () => <Table options={{ ...baseOptions, searchable: true }} data={users} />,
};

export const WithPagination: Story = {
  parameters: {
    docs: { description: { story: "Paginated table — rows split across pages." } },
  },
  render: () => <Table options={{ ...baseOptions, pagination: true }} data={users} />,
};

export const WithSearchAndPagination: Story = {
  parameters: {
    docs: { description: { story: "Search and pagination combined." } },
  },
  render: () => (
    <Table options={{ ...baseOptions, searchable: true, pagination: true }} data={users} />
  ),
};

export const WithSelection: Story = {
  parameters: {
    docs: { description: { story: "Row selection via toggle column." } },
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
      data={users}
    />
  ),
};

export const FullFeatured: Story = {
  parameters: {
    docs: {
      description: { story: "All features enabled — search, pagination, selection, sort, filter." },
    },
  },
  render: () => (
    <Table
      options={{
        ...baseOptions,
        searchable: true,
        pagination: true,
        fieldOptions: [
          { fieldName: "id", selection: true, selectionIdentifier: "id" },
          ...baseOptions.fieldOptions,
        ],
      }}
      data={users}
    />
  ),
};

export const WithDebug: Story = {
  parameters: {
    docs: {
      description: { story: "Debug mode — shows active filter, search, and sort state in footer." },
    },
  },
  render: () => (
    <Table
      options={{ ...baseOptions, searchable: true, pagination: true, debug: true }}
      data={users}
    />
  ),
};

export const Empty: Story = {
  parameters: {
    docs: { description: { story: "Empty state — no rows provided." } },
  },
  render: () => <Table options={baseOptions} data={[]} />,
};

export const EmptyAfterFilter: Story = {
  parameters: {
    docs: { description: { story: "Empty state triggered by a filter that matches no records." } },
  },
  render: () => (
    <Table
      options={{
        ...baseOptions,
        fieldOptions: baseOptions.fieldOptions.map((f) =>
          f.fieldName === "name" ? { ...f, filterable: true } : f,
        ),
      }}
      data={users.slice(0, 5)}
    />
  ),
};
