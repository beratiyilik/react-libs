import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TableOptions } from "@beratiyilik/react-table";
import { Table } from "@beratiyilik/react-table";
import { Button } from "@beratiyilik/react-components";
import { users, type User } from "./data/users.js";

// ─── helpers ────────────────────────────────────────────────────────────────

const statusColor: Record<string, string> = {
  Active: "#16a34a",
  Inactive: "#a1a1aa",
};

const StatusBadge = ({ status }: { status: string }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.375rem",
      fontSize: "0.75rem",
      fontWeight: 500,
      color: statusColor[status] ?? "#71717a",
    }}
  >
    <span
      style={{
        width: "0.5rem",
        height: "0.5rem",
        borderRadius: "50%",
        backgroundColor: statusColor[status] ?? "#a1a1aa",
        flexShrink: 0,
      }}
    />
    {status}
  </span>
);

// ─── base field config ───────────────────────────────────────────────────────

const allFieldOptions: TableOptions<User>["fieldOptions"] = [
  { fieldName: "name", headerName: "Name", sortable: true, filterable: true, width: "180px" },
  { fieldName: "role", headerName: "Role", sortable: true, filterable: true },
  { fieldName: "department", headerName: "Department", sortable: true, filterable: true },
  { fieldName: "location", headerName: "Location", sortable: true, filterable: true },
  {
    fieldName: "status",
    headerName: "Status",
    sortable: true,
    filterable: true,
    render: (row) => <StatusBadge status={row.status} />,
  },
  { fieldName: "email", headerName: "Email", sortable: false, filterable: false },
  { fieldName: "joinDate", headerName: "Join Date", sortable: true, filterable: false },
  { fieldName: "salary", headerName: "Salary", sortable: true, filterable: false },
];

const selectionField: TableOptions<User>["fieldOptions"][number] = {
  fieldName: "id",
  selection: true,
  selectionIdentifier: "id",
  width: "3rem",
};

// ─── meta ────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: [
          "A fully-featured data table built on `@beratiyilik/react-components`.",
          "Supports **sorting**, **filtering**, **fuzzy search** (Fuse.js), **pagination**, **row selection**, **density**, **loading** and **error** states.",
          "Driven by `TableOptions<T>` — pass `fieldOptions` to define columns; everything else is optional.",
        ].join(" "),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

// ─── 1. Core ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: "1 · Default",
  parameters: {
    docs: {
      description: { story: "Basic table — sort and filter on all columns, no pagination." },
    },
  },
  render: () => (
    <Table
      options={{ name: "Users", identifier: "id", fieldOptions: allFieldOptions }}
      data={users}
    />
  ),
};

export const WithSearch: Story = {
  name: "2 · With Search",
  parameters: {
    docs: { description: { story: "Full-text fuzzy search (Fuse.js) across all row fields." } },
  },
  render: () => (
    <Table
      options={{ name: "Users", identifier: "id", fieldOptions: allFieldOptions, searchable: true }}
      data={users}
    />
  ),
};

export const WithPagination: Story = {
  name: "3 · With Pagination",
  parameters: {
    docs: { description: { story: "Paginated rows — page size selector and prev/next controls." } },
  },
  render: () => (
    <Table
      options={{ name: "Users", identifier: "id", fieldOptions: allFieldOptions, pagination: true }}
      data={users}
    />
  ),
};

export const WithSelection: Story = {
  name: "4 · With Selection",
  parameters: {
    docs: {
      description: {
        story:
          "Row selection via Checkbox column. Header checkbox shows indeterminate when some (not all) rows are selected.",
      },
    },
  },
  render: () => (
    <Table
      options={{
        name: "Users",
        identifier: "id",
        fieldOptions: [selectionField, ...allFieldOptions],
        pagination: true,
      }}
      data={users}
    />
  ),
};

// ─── 2. Density ──────────────────────────────────────────────────────────────

export const DensityCompact: Story = {
  name: "5 · Density — Compact",
  parameters: {
    docs: { description: { story: "Compact density — tight padding, high information density." } },
  },
  render: () => (
    <Table
      options={{
        name: "Users",
        identifier: "id",
        fieldOptions: allFieldOptions,
        density: "compact",
        pagination: true,
      }}
      data={users}
    />
  ),
};

export const DensityComfortable: Story = {
  name: "6 · Density — Comfortable",
  parameters: {
    docs: { description: { story: "Comfortable density — default spacing." } },
  },
  render: () => (
    <Table
      options={{
        name: "Users",
        identifier: "id",
        fieldOptions: allFieldOptions,
        density: "comfortable",
        pagination: true,
      }}
      data={users}
    />
  ),
};

export const DensitySpacious: Story = {
  name: "7 · Density — Spacious",
  parameters: {
    docs: {
      description: { story: "Spacious density — generous padding for low-density dashboards." },
    },
  },
  render: () => (
    <Table
      options={{
        name: "Users",
        identifier: "id",
        fieldOptions: allFieldOptions,
        density: "spacious",
        pagination: true,
      }}
      data={users}
    />
  ),
};

// ─── 3. States ───────────────────────────────────────────────────────────────

export const Loading: Story = {
  name: "8 · Loading State",
  parameters: {
    docs: {
      description: {
        story:
          "Loading skeleton — pulse-animated rows replace body content while data is fetched. `role=status` + `aria-busy` set for screen readers.",
      },
    },
  },
  render: () => (
    <Table
      options={{ name: "Users", identifier: "id", fieldOptions: allFieldOptions, loading: true }}
      data={[]}
    />
  ),
};

export const WithError: Story = {
  name: "9 · Error State",
  parameters: {
    docs: { description: { story: "Error state — a ReactNode is rendered in place of rows." } },
  },
  render: () => (
    <Table
      options={{
        name: "Users",
        identifier: "id",
        fieldOptions: allFieldOptions,
        error: "Failed to load users. Please check your connection and try again.",
      }}
      data={[]}
    />
  ),
};

export const Empty: Story = {
  name: "10 · Empty State",
  parameters: {
    docs: { description: { story: "Empty state — no rows provided." } },
  },
  render: () => (
    <Table options={{ name: "Users", identifier: "id", fieldOptions: allFieldOptions }} data={[]} />
  ),
};

export const EmptyAfterFilter: Story = {
  name: "11 · Empty After Filter",
  parameters: {
    docs: {
      description: {
        story:
          "Empty state triggered by a filter that matches no records. Filter the Name column to see it.",
      },
    },
  },
  render: () => (
    <Table
      options={{ name: "Users", identifier: "id", fieldOptions: allFieldOptions }}
      data={users.slice(0, 5)}
    />
  ),
};

// ─── 4. Custom columns ───────────────────────────────────────────────────────

export const CustomRender: Story = {
  name: "12 · Custom Cell Render",
  parameters: {
    docs: {
      description: {
        story:
          "Custom `render` function per column. The **Status** column renders a coloured dot badge; **Salary** right-aligns the value. Column widths are controlled via `width`.",
      },
    },
  },
  render: () => (
    <Table
      options={{
        name: "Users",
        identifier: "id",
        pagination: true,
        fieldOptions: [
          {
            fieldName: "name",
            headerName: "Name",
            sortable: true,
            filterable: true,
            width: "180px",
          },
          { fieldName: "role", headerName: "Role", sortable: true, filterable: true },
          { fieldName: "department", headerName: "Department", sortable: true, filterable: true },
          {
            fieldName: "status",
            headerName: "Status",
            sortable: true,
            filterable: true,
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            fieldName: "salary",
            headerName: "Salary",
            sortable: true,
            filterable: false,
            width: "120px",
            render: (row) => (
              <span
                style={{ fontVariantNumeric: "tabular-nums", textAlign: "right", display: "block" }}
              >
                {row.salary}
              </span>
            ),
          },
        ],
      }}
      data={users}
    />
  ),
};

export const ColumnColors: Story = {
  name: "13 · Column Colors",
  parameters: {
    docs: {
      description: { story: "Each column can receive a background `color` for visual grouping." },
    },
  },
  render: () => (
    <Table
      options={{
        name: "Users",
        identifier: "id",
        fieldOptions: [
          { fieldName: "name", headerName: "Name", sortable: true, width: "180px" },
          { fieldName: "role", headerName: "Role", sortable: true, color: "rgba(99,102,241,0.05)" },
          {
            fieldName: "department",
            headerName: "Department",
            sortable: true,
            color: "rgba(99,102,241,0.05)",
          },
          { fieldName: "location", headerName: "Location", sortable: true },
          {
            fieldName: "status",
            headerName: "Status",
            sortable: true,
            render: (row) => <StatusBadge status={row.status} />,
          },
        ],
      }}
      data={users.slice(0, 15)}
    />
  ),
};

export const WithHeaderComponents: Story = {
  name: "14 · Header Components",
  parameters: {
    docs: {
      description: {
        story:
          "Pass custom `ReactNode[]` via `headerComponents` to render extra controls in the caption action area.",
      },
    },
  },
  render: () => (
    <Table
      options={{
        name: "Users",
        identifier: "id",
        fieldOptions: allFieldOptions,
        searchable: true,
        pagination: true,
        headerComponents: [
          <Button key="export" variant="outline" size="sm">
            Export CSV
          </Button>,
          <Button key="invite" size="sm">
            Invite user
          </Button>,
        ],
      }}
      data={users}
    />
  ),
};

// ─── 5. Debug ────────────────────────────────────────────────────────────────

export const Debug: Story = {
  name: "15 · Debug Mode",
  parameters: {
    docs: {
      description: {
        story:
          "Debug mode shows active search term, filters, sort state, and record count in the footer.",
      },
    },
  },
  render: () => (
    <Table
      options={{
        name: "Users",
        identifier: "id",
        fieldOptions: allFieldOptions,
        searchable: true,
        pagination: true,
        debug: true,
      }}
      data={users}
    />
  ),
};

// ─── 6. Kitchen Sink ─────────────────────────────────────────────────────────

export const KitchenSink: Story = {
  name: "★ Kitchen Sink — All Features",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: [
          "**All features enabled in one interactive example.**",
          "Row selection · Fuzzy search · Sort · Per-column filter · Pagination · Custom cell renders · Status badge · Density picker · Debug footer.",
          "",
          "Use the controls below to toggle density and simulate loading / error states.",
        ].join("\n"),
      },
    },
  },
  render: () => {
    const [density, setDensity] = useState<"compact" | "comfortable" | "spacious">("comfortable");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const densities = ["compact", "comfortable", "spacious"] as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem" }}>
        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.75rem", color: "#71717a", fontWeight: 500 }}>Density:</span>
          {densities.map((d) => (
            <Button
              key={d}
              size="sm"
              variant={density === d ? "primary" : "outline"}
              onClick={() => setDensity(d)}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </Button>
          ))}
          <span
            style={{ fontSize: "0.75rem", color: "#71717a", fontWeight: 500, marginLeft: "0.5rem" }}
          >
            States:
          </span>
          <Button
            size="sm"
            variant={loading ? "primary" : "outline"}
            onClick={() => {
              setLoading((v) => !v);
              setError(undefined);
            }}
          >
            {loading ? "Loading ON" : "Simulate Loading"}
          </Button>
          <Button
            size="sm"
            variant={error ? "destructive" : "outline"}
            onClick={() => {
              setError((v) =>
                v ? undefined : "Network error: Failed to fetch /api/users. Status 503.",
              );
              setLoading(false);
            }}
          >
            {error ? "Error ON" : "Simulate Error"}
          </Button>
        </div>

        {/* Table */}
        <Table
          options={{
            name: "Team Directory",
            identifier: "id",
            searchable: true,
            pagination: true,
            debug: true,
            density,
            loading,
            error,
            fieldOptions: [
              selectionField,
              {
                fieldName: "name",
                headerName: "Name",
                sortable: true,
                filterable: true,
                width: "180px",
              },
              { fieldName: "role", headerName: "Role", sortable: true, filterable: true },
              {
                fieldName: "department",
                headerName: "Department",
                sortable: true,
                filterable: true,
              },
              { fieldName: "location", headerName: "Location", sortable: true, filterable: true },
              {
                fieldName: "status",
                headerName: "Status",
                sortable: true,
                filterable: true,
                render: (row) => <StatusBadge status={row.status} />,
              },
              { fieldName: "joinDate", headerName: "Join Date", sortable: true, filterable: false },
              {
                fieldName: "salary",
                headerName: "Salary",
                sortable: true,
                filterable: false,
                width: "120px",
                render: (row) => (
                  <span
                    style={{
                      fontVariantNumeric: "tabular-nums",
                      textAlign: "right",
                      display: "block",
                    }}
                  >
                    {row.salary}
                  </span>
                ),
              },
            ],
            headerComponents: [
              <Button key="export" variant="outline" size="sm">
                Export CSV
              </Button>,
              <Button key="invite" size="sm">
                Invite user
              </Button>,
            ],
          }}
          data={users}
        />
      </div>
    );
  },
};
