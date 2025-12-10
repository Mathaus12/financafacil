# Guia de Exportação do Projeto "Controle Fácil"

Este arquivo contém o conteúdo completo de todos os arquivos do seu projeto. Siga os passos abaixo para recriar o projeto no seu computador:

1.  Crie uma nova pasta no seu PC.
2.  Dentro dela, recrie a estrutura de pastas e arquivos exatamente como listado abaixo.
3.  Copie e cole o conteúdo de cada bloco de código para o arquivo correspondente.
4.  Depois de criar todos os arquivos, execute `npm install` no terminal para instalar as dependências.
5.  Execute `npm run deploy` para implantar a versão correta no Firebase Hosting.

---

### Arquivo: `.env`

```

```

---

### Arquivo: `.firebaserc`
```json
{
  "projects": {
    "default": "financafacill"
  }
}
```

---

### Arquivo: `README.md`

```md
# Controle Fácil

Este é um aplicativo de controle financeiro pessoal criado com Next.js e Firebase.

O aplicativo foi desenvolvido no Firebase Studio e está configurado para ser implantado automaticamente através do GitHub Actions no Firebase Hosting.
```

---

### Arquivo: `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

---

### Arquivo: `docs/backend.json`

```json
{
  "entities": {
    "Expense": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Expense",
      "type": "object",
      "description": "Represents a single expense entry.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the expense entry."
        },
        "categoryId": {
          "type": "string",
          "description": "Reference to Category. (Relationship: Category 1:N Expense)"
        },
        "paymentMethodId": {
          "type": "string",
          "description": "Reference to PaymentMethod. (Relationship: PaymentMethod 1:N Expense)"
        },
        "amount": {
          "type": "number",
          "description": "The amount of the expense."
        },
        "date": {
          "type": "string",
          "description": "The date of the expense.",
          "format": "date-time"
        },
        "description": {
          "type": "string",
          "description": "A description of the expense."
        },
        "installmentDetails": {
          "type": "array",
          "description": "If the expense is in installments, contains references to each installment.",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "id",
        "categoryId",
        "paymentMethodId",
        "amount",
        "date"
      ]
    },
    "Category": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Category",
      "type": "object",
      "description": "Represents a category of expenses (e.g., food, rent, transport).",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the expense category."
        },
        "name": {
          "type": "string",
          "description": "The name of the category."
        }
      },
      "required": [
        "id",
        "name"
      ]
    },
    "PaymentMethod": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "PaymentMethod",
      "type": "object",
      "description": "Represents a payment method (e.g., credit card, debit card, cash).",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the payment method."
        },
        "name": {
          "type": "string",
          "description": "The name of the payment method."
        }
      },
      "required": [
        "id",
        "name"
      ]
    },
    "Installment": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Installment",
      "type": "object",
      "description": "Represents an installment of an expense paid over multiple months.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the installment."
        },
        "expenseId": {
          "type": "string",
          "description": "Reference to Expense. (Relationship: Expense 1:N Installment)"
        },
        "amount": {
          "type": "number",
          "description": "The amount of the installment."
        },
        "dueDate": {
          "type": "string",
          "description": "The due date of the installment.",
          "format": "date-time"
        },
        "isPaid": {
          "type": "boolean",
          "description": "Whether the installment has been paid."
        }
      },
      "required": [
        "id",
        "expenseId",
        "amount",
        "dueDate"
      ]
    },
    "UserSetting": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "UserSetting",
      "type": "object",
      "description": "Represents a user-specific setting, like monthly salary.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the setting document."
        },
        "amount": {
          "type": "number",
          "description": "The value of the setting, e.g., salary amount."
        }
      },
      "required": [
        "id",
        "amount"
      ]
    },
    "Bank": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Bank",
      "type": "object",
      "description": "Represents a bank or financial institution.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the bank."
        },
        "name": {
          "type": "string",
          "description": "The name of the bank."
        }
      },
      "required": [
        "id",
        "name"
      ]
    },
    "UserProfile": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "UserProfile",
      "type": "object",
      "description": "Represents a user's profile information.",
      "properties": {
        "id": {
          "type": "string",
          "description": "Unique identifier for the user profile."
        },
        "name": {
          "type": "string",
          "description": "The user's full name."
        },
        "birthDate": {
          "type": "string",
          "format": "date",
          "description": "The user's date of birth."
        },
        "workplace": {
          "type": "string",
          "description": "The user's place of work."
        },
        "position": {
          "type": "string",
          "description": "The user's job title or position."
        },
        "role": {
          "type": "string",
          "description": "The user's main function or role at their job."
        }
      },
      "required": [
        "id",
        "name",
        "birthDate"
      ]
    }
  },
  "auth": {
    "providers": [
      "password",
      "anonymous"
    ]
  },
  "firestore": {
    "structure": [
      {
        "path": "/users/{userId}/categories/{categoryId}",
        "definition": {
          "entityName": "Category",
          "schema": {
            "$ref": "#/backend/entities/Category"
          },
          "description": "Stores expense categories for each user. Path-based ownership ensures only the user can access their categories.",
          "params": [
            {
              "name": "userId",
              "description": "The ID of the user."
            },
            {
              "name": "categoryId",
              "description": "The ID of the expense category."
            }
          ]
        }
      },
      {
        "path": "/users/{userId}/paymentMethods/{paymentMethodId}",
        "definition": {
          "entityName": "PaymentMethod",
          "schema": {
            "$ref": "#/backend/entities/PaymentMethod"
          },
          "description": "Stores payment methods for each user. Path-based ownership ensures only the user can access their payment methods.",
          "params": [
            {
              "name": "userId",
              "description": "The ID of the user."
            },
            {
              "name": "paymentMethodId",
              "description": "The ID of the payment method."
            }
          ]
        }
      },
       {
        "path": "/users/{userId}/banks/{bankId}",
        "definition": {
          "entityName": "Bank",
          "schema": {
            "$ref": "#/backend/entities/Bank"
          },
          "description": "Stores banks for each user. Path-based ownership ensures only the user can access their banks.",
          "params": [
            {
              "name": "userId",
              "description": "The ID of the user."
            },
            {
              "name": "bankId",
              "description": "The ID of the bank."
            }
          ]
        }
      },
      {
        "path": "/users/{userId}/expenses/{expenseId}",
        "definition": {
          "entityName": "Expense",
          "schema": {
            "$ref": "#/backend/entities/Expense"
          },
          "description": "Stores expense entries for each user. Path-based ownership ensures only the user can access their expenses.",
          "params": [
            {
              "name": "userId",
              "description": "The ID of the user."
            },
            {
              "name": "expenseId",
              "description": "The ID of the expense entry."
            }
          ]
        }
      },
      {
        "path": "/users/{userId}/expenses/{expenseId}/installments/{installmentId}",
        "definition": {
          "entityName": "Installment",
          "schema": {
            "$ref": "#/backend/entities/Installment"
          },
          "description": "Stores installment details for each expense, nested under the expense document. Path-based ownership ensures only the user can access installments related to their expenses.",
          "params": [
            {
              "name": "userId",
              "description": "The ID of the user."
            },
            {
              "name": "expenseId",
              "description": "The ID of the expense entry."
            },
            {
              "name": "installmentId",
              "description": "The ID of the installment."
            }
          ]
        }
      },
      {
        "path": "/users/{userId}/settings/{settingId}",
        "definition": {
          "entityName": "UserSetting",
          "schema": {
            "$ref": "#/backend/entities/UserSetting"
          },
          "description": "Stores user-specific settings. Path-based ownership ensures only the user can access their own settings.",
          "params": [
            {
              "name": "userId",
              "description": "The ID of the user."
            },
            {
              "name": "settingId",
              "description": "The ID of the setting document (e.g., 'salary')."
            }
          ]
        }
      },
      {
        "path": "/users/{userId}/profile/main",
        "definition": {
          "entityName": "UserProfile",
          "schema": {
            "$ref": "#/backend/entities/UserProfile"
          },
          "description": "Stores the user's profile information in a single document. Path-based ownership ensures only the user can access their own profile.",
          "params": [
            {
              "name": "userId",
              "description": "The ID of the user."
            }
          ]
        }
      }
    ],
    "reasoning": "The Firestore data structure is designed to manage user expenses, categories, payment methods, and installments. It prioritizes authorization independence by placing all data under user-specific collections (`/users/{userId}`). This eliminates the need for `get()` calls in security rules, allowing for atomic operations and simplified security management.  User-owned data is stored in hierarchical paths, ensuring secure and efficient ownership-based security rules (e.g., `/users/{userId}/categories/{categoryId}`). This approach avoids complex rule logic and enhances debuggability. Segregation is achieved by storing related data (categories, payment methods, expenses, and installments) in separate collections under the user's document, ensuring each collection has a clear security posture. This eliminates the need to mix documents with different access requirements in the same collection.  The structure supports required QAPs by using path-based ownership for all user-related data. List operations are secure because access control is enforced at the collection level, based on the user's ID in the path. There is no cross-user data mixing, and security rules can efficiently validate access based on the `request.auth.uid`."
  }
}
```

---

### Arquivo: `firebase.json`

```json
{
  "hosting": {
    "source": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "frameworksBackend": {
      "region": "us-central1"
    }
  }
}
```

---

### Arquivo: `firestore.rules`

```rules
/**
 * Core Philosophy: This ruleset enforces a strict user-ownership model. All user-generated
 * content, such as expenses, categories, and payment methods, is exclusively accessible by the
 * user who created it. There is no concept of public data or shared access between users.
 *
 * Data Structure: The entire data model is hierarchical and user-scoped. All data is nested
 * under the `/users/{userId}` path, creating a secure and isolated data silo for each user.
 * For example, a user's expense categories are stored at `/users/{userId}/categories/{categoryId}`.
 *
 * Key Security Decisions:
 * - User Enumeration is Prevented: Listing the top-level `/users` collection is explicitly
 *   disallowed to prevent leaking user information.
 * - No Cross-User Access: Rules strictly enforce that a user's authentication UID must match
 *   the `{userId}` wildcard in the path they are trying to access.
 * - Default Deny: Access is denied by default. Permissions must be explicitly granted.
 * - Performance-Optimized Authorization: The path-based security model avoids the need for
 *   costly `get()` or `exists()` calls to other documents for authorization checks, resulting
 *   in faster and more scalable rules.
 *
 * Denormalization for Authorization: The primary method of authorization is the document path
 * itself. The `{userId}` in the path acts as the denormalized ownership link, making rules
 * like `request.auth.uid == userId` simple, fast, and secure. This avoids needing an `ownerId`
 * field on every document for basic ownership checks.
 *
 * Structural Segregation: Each type of user data (categories, payment methods, expenses, etc.)
 * is stored in its own dedicated subcollection under the user's path. This segregation ensures
 * that the security rules for each data type are clear, simple, and isolated from one another.
 */
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    //-------------------------------------------------------------------------
    // Helper Functions
    //-------------------------------------------------------------------------

    /**
     * Checks if the user is authenticated.
     */
    function isSignedIn() {
      return request.auth != null;
    }

    /**
     * Validates if the currently authenticated user is the owner of the resource
     * based on the userId provided in the document path.
     */
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }

    /**
     * A robust check for update and delete operations, ensuring the user is the
     * owner AND the document already exists.
     */
    function isExistingOwner(userId) {
      return isOwner(userId) && resource != null;
    }

    //-------------------------------------------------------------------------
    // User Data Scoped Rules
    //-------------------------------------------------------------------------

    /**
     * @description Secures the top-level user document. This allows a user to
     *   manage their own user document but prevents them from seeing or listing
     *   other users' documents.
     * @path /users/{userId}
     * @allow A newly signed-up user (create) their own document at `/users/USER_123`.
     * @deny A user (read) the document at `/users/OTHER_USER_456`.
     * @deny Any user (list) the `/users` collection to prevent user enumeration.
     * @principle Restricts access to a user's own root document and prevents data leakage.
     */
    match /users/{userId} {
      allow get: if isOwner(userId);
      allow list: if false;
      allow create: if isOwner(userId);
      allow update: if isExistingOwner(userId);
      allow delete: if isExistingOwner(userId);
    }
    
    /**
     * @description Secures a user's settings. Only the owning user can
     *   read or write their own settings.
     * @path /users/{userId}/settings/{settingId}
     * @allow User 'USER_123' (get) a setting from their own subcollection.
     * @deny An unauthenticated user (delete) any setting.
     * @principle Enforces strict data ownership for user-specific configurations.
     */
    match /users/{userId}/settings/{settingId} {
      allow get, list, create, update, delete: if isOwner(userId);
    }

    /**
     * @description Secures a user's profile document. Only the owning user can
     *   read or write their own profile.
     * @path /users/{userId}/profile/main
     * @allow User 'USER_123' (get, create, update) their own profile document.
     * @deny Another user (read, write) the profile document.
     * @principle Enforces strict data ownership for user-specific profile information.
     */
    match /users/{userId}/profile/main {
      allow get, create, update: if isOwner(userId);
      allow list, delete: if false; // List and delete are not allowed for the profile
    }

    /**
     * @description Secures a user's expense categories. Only the owning user can
     *   read or write their own categories.
     * @path /users/{userId}/categories/{categoryId}
     * @allow User 'USER_123' (create) a new category document in their own subcollection.
     * @deny User 'USER_456' (update) a category in '/users/USER_123/categories/...'.
     * @principle Enforces strict data ownership within a user's private data tree.
     */
    match /users/{userId}/categories/{categoryId} {
      allow get, list, create, update, delete: if isOwner(userId);
    }

    /**
     * @description Secures a user's payment methods. Only the owning user can
     *   read or write their own payment methods.
     * @path /users/{userId}/paymentMethods/{paymentMethodId}
     * @allow User 'USER_123' (get) a payment method from their own subcollection.
     * @deny An unauthenticated user (delete) any payment method.
     * @principle Enforces strict data ownership within a user's private data tree.
     */
    match /users/{userId}/paymentMethods/{paymentMethodId} {
      allow get, list, create, update, delete: if isOwner(userId);
    }
    
    /**
     * @description Secures a user's banks. Only the owning user can
     *   read or write their own banks.
     * @path /users/{userId}/banks/{bankId}
     * @allow User 'USER_123' (get) a bank from their own subcollection.
     * @deny An unauthenticated user (delete) any bank.
     * @principle Enforces strict data ownership for user-specific configurations.
     */
    match /users/{userId}/banks/{bankId} {
        allow get, list, create, update, delete: if isOwner(userId);
    }

    /**
     * @description Secures a user's expense entries. Only the owning user can
     *   read or write their own expenses.
     * @path /users/{userId}/expenses/{expenseId}
     * @allow User 'USER_123' (list) all expenses in their own subcollection.
     * @deny User 'USER_456' (create) an expense in '/users/USER_123/expenses/...'.
     * @principle Enforces strict data ownership within a user's private data tree.
     */
    match /users/{userId}/expenses/{expenseId} {
      allow get, list, delete: if isOwner(userId);
      allow create: if isOwner(userId);
      allow update: if isExistingOwner(userId);
    }

    /**
     * @description Secures installment details for an expense. Access is granted
     *   based on ownership of the parent user path.
     * @path /users/{userId}/expenses/{expenseId}/installments/{installmentId}
     * @allow User 'USER_123' (create) a new installment under one of their own expenses.
     * @deny User 'USER_456' (get) an installment from another user's expense.
     * @principle Validates relational integrity by ensuring created installments
     *   correctly reference their parent expense ID.
     */
    match /users/{userId}/expenses/{expenseId}/installments/{installmentId} {
      allow get, list, delete: if isOwner(userId);
      allow create: if isOwner(userId) && request.resource.data.id == installmentId && request.resource.data.expenseId == expenseId;
      allow update: if isExistingOwner(userId) && request.resource.data.id == resource.data.id && request.resource.data.expenseId == resource.data.expenseId;
      allow delete: if isExistingOwner(userId);
    }
  }
}
```

---

### Arquivo: `next.config.ts`

```ts
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

---

### Arquivo: `package.json`

```json
{
  "name": "nextn",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack -p 9002",
    "genkit:dev": "genkit start -- tsx src/ai/dev.ts",
    "genkit:watch": "genkit start -- tsx --watch src/ai/dev.ts",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "deploy": "firebase deploy --only hosting"
  },
  "dependencies": {
    "@genkit-ai/google-genai": "^1.20.0",
    "@genkit-ai/next": "^1.20.0",
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-alert-dialog": "^1.1.6",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-menubar": "^1.1.6",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-toast": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.1.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "date-fns-tz": "^3.1.3",
    "embla-carousel-react": "^8.6.0",
    "firebase": "^11.9.1",
    "genkit": "^1.20.0",
    "lucide-react": "^0.475.0",
    "next": "^15.3.6",
    "next-themes": "^0.4.0",
    "patch-package": "^8.0.0",
    "react": "^19.2.1",
    "react-day-picker": "^9.11.3",
    "react-dom": "^19.2.1",
    "react-hook-form": "^7.54.2",
    "recharts": "^2.15.1",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19.2.1",
    "@types/react-dom": "^19.2.1",
    "genkit-cli": "^1.20.0",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

---

### Arquivo: `src/ai/dev.ts`

```ts
// Flows will be imported for their side effects in this file.
```

---

### Arquivo: `src/ai/genkit.ts`

```ts
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
```

---

### Arquivo: `src/app/dashboard/page.tsx`

```tsx
'use client';

import { useState, useMemo } from 'react';
import type { Expense } from '@/lib/types';
import { useData } from '@/context/data-context';
import { DashboardView } from '@/components/dashboard-view';
import { ExpenseFilters, type Filters } from '@/components/expense-filters';
import { AppLayout } from '@/components/app-layout';

export default function DashboardPage() {
  const { expenses } = useData();
  
  const [filters, setFilters] = useState<Omit<Filters, 'dateRange'>>({
    category: "Todos",
    paymentMethod: "Todos",
    status: "Todos",
  });

  const applyFilters = (expenseList: Expense[]) => {
    return expenseList.filter(expense => {
      if (filters.category !== 'Todos' && expense.category !== filters.category) {
        return false;
      }
      if (filters.paymentMethod !== 'Todos' && expense.paymentMethod !== filters.paymentMethod) {
        return false;
      }
      if (filters.status !== 'Todos') {
        const isPaid = filters.status === 'Pago';
        if (expense.paid !== isPaid) {
          return false;
        }
      }
      return true;
    });
  };

  const filteredExpenses = useMemo(() => {
    return applyFilters(expenses);
  }, [expenses, filters]);

  return (
    <AppLayout>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <ExpenseFilters onFilterChange={setFilters} />
        <DashboardView expenses={filteredExpenses} />
      </div>
    </AppLayout>
  );
}
```

---

### Arquivo: `src/app/expenses/page.tsx`

```tsx
'use client';

import { useState, useMemo } from 'react';
import { isSameMonth, parseISO } from 'date-fns';
import type { Expense } from '@/lib/types';
import { useData } from '@/context/data-context';
import { ExpensesView } from '@/components/expenses-view';
import { ExpenseFilters, type Filters } from '@/components/expense-filters';
import { MonthNavigator } from '@/components/month-navigator';
import { AppLayout } from '@/components/app-layout';
import { ExpenseForm } from '@/components/expense-form';

export default function ExpensesPage() {
  const { 
    expenses, 
    addExpense,
    updateExpense,
    deleteExpense,
    bulkUpdatePaidStatus,
    bulkDeleteExpenses,
    salary,
    updateSalary,
  } = useData();

  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);

  const [filters, setFilters] = useState<Omit<Filters, 'dateRange'>>({
    category: 'Todos',
    paymentMethod: 'Todos',
    status: 'Todos',
  });

  const openAddSheet = () => {
    setExpenseToEdit(null);
    setSheetOpen(true);
  };

  const openEditSheet = (expense: Expense) => {
    setExpenseToEdit(expense);
    setSheetOpen(true);
  };

  const monthlyExpenses = useMemo(() => {
    const selectedDate = parseISO(currentDate);
    return expenses.filter(expense => {
      const expenseDate = parseISO(expense.date);
      return isSameMonth(selectedDate, expenseDate);
    });
  }, [expenses, currentDate]);

  const applyFilters = (expenseList: Expense[]) => {
    return expenseList.filter(expense => {
      if (filters.category !== 'Todos' && expense.category !== filters.category) {
        return false;
      }
      if (filters.paymentMethod !== 'Todos' && expense.paymentMethod !== filters.paymentMethod) {
        return false;
      }
      if (filters.status !== 'Todos') {
        const isPaid = filters.status === 'Pago';
        if (expense.paid !== isPaid) {
          return false;
        }
      }
      return true;
    });
  };

  const filteredMonthlyExpenses = useMemo(() => {
    return applyFilters(monthlyExpenses);
  }, [monthlyExpenses, filters]);

  return (
    <AppLayout onAddExpense={openAddSheet}>
      <div className="flex-1 space-y-4">
        <MonthNavigator currentDate={currentDate} onDateChange={setCurrentDate} />
        <ExpenseFilters onFilterChange={setFilters} />
        <ExpensesView
            expenses={filteredMonthlyExpenses}
            salary={salary}
            updateSalary={updateSalary}
            onEdit={openEditSheet}
            onDelete={deleteExpense}
            onBulkDelete={bulkDeleteExpenses}
            onBulkUpdatePaid={bulkUpdatePaidStatus}
          />
      </div>
      <ExpenseForm
        isOpen={sheetOpen}
        onOpenChange={setSheetOpen}
        addExpense={(data) => addExpense(data, () => setCurrentDate(data.date))}
        updateExpense={updateExpense}
        expenseToEdit={expenseToEdit}
      />
    </AppLayout>
  );
}
```

---

### Arquivo: `src/app/forgot-password/page.tsx`

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { useAuth } from "@/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const formSchema = z.object({
  email: z.string().email("Email inválido."),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, values.email);
      setEmailSent(true);
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    } catch (error: any) {
      console.error("Firebase Auth Error:", error);
      let description = "Ocorreu um erro ao enviar o email de redefinição.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
        description = "Nenhum usuário encontrado com este email.";
      }
      toast({
        variant: "destructive",
        title: "Erro",
        description,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Redefinir Senha</CardTitle>
            <CardDescription>
              Digite seu email para receber o link de redefinição.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {emailSent ? (
              <div className="text-center">
                <p className="text-green-600 font-medium">Um link para redefinir sua senha foi enviado para seu e-mail.</p>
                <Link href="/login" className="mt-4 inline-block font-medium text-primary hover:underline">
                    Voltar para o Login
                </Link>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="seu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Enviar Email"}
                  </Button>
                </form>
              </Form>
            )}

            <div className="mt-6 text-center text-sm">
              Lembrou sua senha?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Faça login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
```

---

### Arquivo: `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: Arial, Helvetica, sans-serif;
}

@layer base {
  :root {
    --background: 210 100% 97%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 142.1 76.2% 36.3%;
    --accent-foreground: 355.7 100% 97.3%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 217.2 91.2% 59.8%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

---

### Arquivo: `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { FirebaseProvider } from "@/firebase";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { DataProvider } from "@/context/data-context";

export const metadata: Metadata = {
  title: "Controle Fácil",
  description: "Seu controle financeiro simplificado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <FirebaseProvider>
          <DataProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </DataProvider>
        </FirebaseProvider>
      </body>
    </html>
  );
}
```

---

### Arquivo: `src/app/login/page.tsx`

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const formSchema = z.object({
  email: z.string().email("Email inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Login bem-sucedido!",
        description: "Você será redirecionado em breve.",
      });
      router.push("/");
    } catch (error: any) {
      console.error("Firebase Auth Error:", error);
      let description = "Ocorreu um erro ao fazer login.";
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === 'auth/invalid-credential') {
        description = "Email ou senha inválidos.";
      }
      toast({
        variant: "destructive",
        title: "Erro no login",
        description,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Acesse sua conta para gerenciar suas finanças.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                            <span className="sr-only">
                              {showPassword ? "Ocultar senha" : "Mostrar senha"}
                            </span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-primary hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              Não tem uma conta?{" "}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                Cadastre-se
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
```

---

### Arquivo: `src/app/page.tsx`

```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

export default function Home() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p>Carregando...</p>
    </div>
  );
}
```

---

### Arquivo: `src/app/profile/page.tsx`

```tsx
'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect } from 'react';

import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useData } from '@/context/data-context';
import type { UserProfile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const profileSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Data inválida. Use o formato AAAA-MM-DD.',
  }),
  workplace: z.string().optional(),
  position: z.string().optional(),
  role: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { userProfile, updateUserProfile, loading } = useData();
  const { toast } = useToast();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      birthDate: '',
      workplace: '',
      position: '',
      role: '',
    },
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({
        name: userProfile.name || '',
        birthDate: userProfile.birthDate ? userProfile.birthDate.split('T')[0] : '',
        workplace: userProfile.workplace || '',
        position: userProfile.position || '',
        role: userProfile.role || '',
      });
    }
  }, [userProfile, form]);

  const onSubmit = (data: ProfileFormData) => {
    updateUserProfile(data);
    toast({
        title: 'Perfil Atualizado!',
        description: 'Suas informações foram salvas com sucesso.',
    });
  };

  if (loading) {
    return (
        <AppLayout>
            <div className="flex h-full flex-1 items-center justify-center">
              <p>Carregando... Por favor, aguarde!</p>
            </div>
        </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
        <Card>
          <CardHeader>
            <CardTitle>Informações do Perfil</CardTitle>
            <CardDescription>Atualize suas informações pessoais e profissionais.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <h3 className="text-lg font-bold">Informações Pessoais</h3>
                <div className="space-y-4">
                    <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                            <Input placeholder="Seu nome completo" {...form.register('name')} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Data de Nascimento</FormLabel>
                        <FormControl>
                            <Input type="date" {...form.register('birthDate')} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.birthDate?.message}</FormMessage>
                    </FormItem>
                </div>
                
                <Separator />

                <h3 className="text-lg font-bold">Informações Profissionais</h3>
                <div className="space-y-4">
                     <FormItem>
                        <FormLabel>Local de Trabalho</FormLabel>
                        <FormControl>
                            <Input placeholder="Onde você trabalha" {...form.register('workplace')} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.workplace?.message}</FormMessage>
                    </FormItem>
                     <FormItem>
                        <FormLabel>Cargo</FormLabel>
                        <FormControl>
                            <Input placeholder="Seu cargo" {...form.register('position')} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.position?.message}</FormMessage>
                    </FormItem>
                     <FormItem>
                        <FormLabel>Função</FormLabel>
                        <FormControl>
                            <Input placeholder="Sua função" {...form.register('role')} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.role?.message}</FormMessage>
                    </FormItem>
                </div>

                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
```

---

### Arquivo: `src/app/settings/page.tsx`

```tsx
'use client';

import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CategoryManager } from '@/components/category-manager';
import { PaymentMethodManager } from '@/components/payment-method-manager';
import { BankManager } from '@/components/bank-manager';

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Cadastros</h1>
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="flex-wrap justify-start h-auto w-full md:w-auto">
            <TabsTrigger value="categories">Categorias</TabsTrigger>
            <TabsTrigger value="paymentMethods">Formas de Pagamento</TabsTrigger>
            <TabsTrigger value="banks">Bancos</TabsTrigger>
          </TabsList>
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Categorias</CardTitle>
              </CardHeader>
              <CardContent>
                <CategoryManager />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="paymentMethods">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Formas de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentMethodManager />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="banks">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Bancos</CardTitle>
              </CardHeader>
              <CardContent>
                <BankManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
```

---

### Arquivo: `src/app/signup/page.tsx`

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Email inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export default function SignUpPage() {
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Conta criada com sucesso!",
        description: "Você será redirecionado para a tela principal.",
      });
      router.push("/");
    } catch (error: any) {
       console.error("Firebase Auth Error:", error);
       let description = "Ocorreu um erro ao criar sua conta.";
       if (error.code === 'auth/email-already-in-use') {
         description = "Este email já está em uso.";
       } else if (error.code === 'auth/weak-password') {
         description = "A senha é muito fraca. Tente uma mais forte.";
       }
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description,
      });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Criar Conta</CardTitle>
            <CardDescription>
              Crie sua conta para começar a gerenciar suas finanças.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                            <span className="sr-only">
                              {showPassword ? "Ocultar senha" : "Mostrar senha"}
                            </span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Criando conta..." : "Criar Conta"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              Já tem uma conta?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Faça login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
```

---

### Arquivo: `src/components/FirebaseErrorListener.tsx`

```tsx
'use client';

import { useState, useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * An invisible component that listens for globally emitted 'permission-error' events.
 * It throws any received error to be caught by Next.js's global-error.tsx.
 */
export function FirebaseErrorListener() {
  // Use the specific error type for the state for type safety.
  const [error, setError] = useState<FirestorePermissionError | null>(null);

  useEffect(() => {
    // The callback now expects a strongly-typed error, matching the event payload.
    const handleError = (error: FirestorePermissionError) => {
      // Set error in state to trigger a re-render.
      setError(error);
    };

    // The typed emitter will enforce that the callback for 'permission-error'
    // matches the expected payload type (FirestorePermissionError).
    errorEmitter.on('permission-error', handleError);

    // Unsubscribe on unmount to prevent memory leaks.
    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  // On re-render, if an error exists in state, throw it.
  if (error) {
    throw error;
  }

  // This component renders nothing.
  return null;
}
```

---

### Arquivo: `src/components/app-layout.tsx`

```tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, PlusCircle, LayoutDashboard, Wallet, ClipboardList, User as UserIcon } from 'lucide-react';
import { useUser } from '@/firebase';
import { useData } from '@/context/data-context';
import { getAuth } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AppLayoutProps {
  children: ReactNode;
  onAddExpense?: () => void;
}

const navItems = [
  { href: '/expenses', label: 'Despesas', icon: Wallet },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export function AppLayout({ children, onAddExpense }: AppLayoutProps) {
  const { user, loading: userLoading } = useUser();
  const { userProfile, loading: dataLoading } = useData();
  const router = useRouter();
  const pathname = usePathname();

  const isLoading = userLoading || dataLoading;

  useEffect(() => {
    if (!userLoading && !user) {
      router.replace('/login');
    }
  }, [user, userLoading, router]);

  const handleLogout = async () => {
    const auth = getAuth();
    await auth.signOut();
    router.push('/login');
  };
  
  const firstName = userProfile?.name?.split(' ')[0];

  if (userLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando... Por favor, aguarde!</p>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar for desktop */}
      <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-6">
            <Logo />
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                      isActive && 'bg-muted text-primary'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      <div className="flex flex-col">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-4 md:px-6 justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile: Greeting or Logo */}
            <div className="md:hidden flex items-center gap-2">
              {firstName ? (
                <>
                  <Wallet className="h-7 w-7 text-primary" />
                  <span className="font-semibold text-lg">Olá, {firstName}</span>
                </>
              ) : (
                <Logo />
              )}
            </div>
            {/* Desktop: Greeting */}
            <div className="hidden md:block">
                {firstName ? <span className="font-semibold text-lg">Olá, {firstName}</span> : <Logo />}
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
            <div className="hidden md:block">
             {onAddExpense && (
                <Button onClick={onAddExpense} size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Despesa
                </Button>
             )}
            </div>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.email?.[0].toUpperCase() ?? '?'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                 <DropdownMenuItem onClick={() => router.push('/profile')}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Cadastros
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content & Footer Wrapper */}
        <div className="flex flex-1 flex-col">
          <main className="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-8">
              {isLoading ? (
                <div className="flex h-full flex-1 items-center justify-center">
                  <p>Carregando... Por favor, aguarde!</p>
                </div>
              ) : (
                children
              )}
          </main>
          
          {/* Bottom Bar for mobile */}
          <footer className="md:hidden sticky bottom-0 left-0 z-50 w-full border-t bg-background">
            <nav className="grid h-16 grid-cols-3 items-center justify-center text-xs">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'flex flex-col items-center gap-1 p-1 text-muted-foreground hover:text-primary',
                      isActive && 'text-primary'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-center">{label}</span>
                  </Link>
                )
              })}
              <div className="flex justify-center">
                  {onAddExpense && (
                      <Button
                        size="icon"
                        className="h-14 w-14 rounded-full shadow-lg"
                        onClick={onAddExpense}
                      >
                        <PlusCircle className="h-6 w-6" />
                        <span className="sr-only">Adicionar Despesa</span>
                      </Button>
                  )}
              </div>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  );
}
```

---

### Arquivo: `src/components/bank-manager.tsx`

```tsx
'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useData } from '@/context/data-context';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Bank } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
});

interface BankFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  addBank: (data: { name: string }) => void;
  updateBank: (bank: Bank) => void;
  bankToEdit: Bank | null;
}

function BankForm({
  isOpen,
  onOpenChange,
  addBank,
  updateBank,
  bankToEdit,
}: BankFormProps) {
  const isEditMode = !!bankToEdit;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (bankToEdit) {
      form.reset({ name: bankToEdit.name });
    } else {
      form.reset({ name: '' });
    }
  }, [bankToEdit, form, isOpen]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (isEditMode && bankToEdit) {
      updateBank({ ...bankToEdit, ...data });
    } else {
      addBank(data);
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Banco' : 'Adicionar Banco'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Banco</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Nubank" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function BankManager() {
  const { banks, addBank, updateBank, deleteBank, loading } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [bankToEdit, setBankToEdit] = useState<Bank | null>(null);
  const [deleteAlert, setDeleteAlert] = useState<{isOpen: boolean, bankId: string | null}>({isOpen: false, bankId: null});

  const handleAdd = () => {
    setBankToEdit(null);
    setIsFormOpen(true);
  };

  const handleEdit = (bank: Bank) => {
    setBankToEdit(bank);
    setIsFormOpen(true);
  };

  const handleDelete = (bankId: string) => {
    setDeleteAlert({isOpen: true, bankId});
  };

  const confirmDelete = () => {
    if (deleteAlert.bankId) {
        deleteBank(deleteAlert.bankId);
    }
    setDeleteAlert({isOpen: false, bankId: null});
  }

  if (loading) {
    return <p>Carregando bancos...</p>;
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Banco
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banks.map((bank) => (
              <TableRow key={bank.id}>
                <TableCell>{bank.name}</TableCell>
                <TableCell>
                <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(bank)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(bank.id)} className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <BankForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        addBank={addBank}
        updateBank={updateBank}
        bankToEdit={bankToEdit}
      />

       <AlertDialog open={deleteAlert.isOpen} onOpenChange={(isOpen) => setDeleteAlert({isOpen, bankId: isOpen ? deleteAlert.bankId : null})}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Isso excluirá permanentemente o banco.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
                        Excluir
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}
```

---

### Arquivo: `src/components/category-manager.tsx`

```tsx
'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useData } from '@/context/data-context';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Category } from '@/lib/types';


const formSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
});

interface CategoryFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  addCategory: (data: { name: string }) => void;
  updateCategory: (category: Category) => void;
  categoryToEdit: Category | null;
}

function CategoryForm({
  isOpen,
  onOpenChange,
  addCategory,
  updateCategory,
  categoryToEdit,
}: CategoryFormProps) {
  const isEditMode = !!categoryToEdit;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (categoryToEdit) {
      form.reset({ name: categoryToEdit.name });
    } else {
      form.reset({ name: '' });
    }
  }, [categoryToEdit, form, isOpen]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (isEditMode && categoryToEdit) {
      updateCategory({ ...categoryToEdit, ...data });
    } else {
      addCategory(data);
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Categoria' : 'Adicionar Categoria'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Categoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Alimentação" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


export function CategoryManager() {
  const { categories, addCategory, updateCategory, deleteCategory, loading } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [deleteAlert, setDeleteAlert] = useState<{isOpen: boolean, categoryId: string | null}>({isOpen: false, categoryId: null});

  const handleAdd = () => {
    setCategoryToEdit(null);
    setIsFormOpen(true);
  };

  const handleEdit = (category: Category) => {
    setCategoryToEdit(category);
    setIsFormOpen(true);
  };

  const handleDelete = (categoryId: string) => {
    setDeleteAlert({isOpen: true, categoryId});
  };

  const confirmDelete = () => {
    if (deleteAlert.categoryId) {
        deleteCategory(deleteAlert.categoryId);
    }
    setDeleteAlert({isOpen: false, categoryId: null});
  }

  if (loading) {
    return <p>Carregando categorias...</p>;
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Categoria
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.name}</TableCell>
                <TableCell>
                <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(cat)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(cat.id)} className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CategoryForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        addCategory={addCategory}
        updateCategory={updateCategory}
        categoryToEdit={categoryToEdit}
      />

       <AlertDialog open={deleteAlert.isOpen} onOpenChange={(isOpen) => setDeleteAlert({isOpen, categoryId: isOpen ? deleteAlert.categoryId : null})}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Isso excluirá permanentemente a categoria.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
                        Excluir
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}
```

---

### Arquivo: `src/components/charts/expenses-by-category-chart.tsx`

```tsx
"use client"

import { useMemo } from "react";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, LabelList } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { Expense } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useData } from "@/context/data-context";

interface ExpensesByCategoryChartProps {
  expenses: Expense[];
}

const CustomLabel = (props: any) => {
  const { x, y, width, height, value, fill } = props;
  const formattedValue = formatCurrency(value);
  const labelWidth = formattedValue.length * 7; // Approximate width of the label
  
  const fitsInside = width > labelWidth + 10;
  
  return (
    <text
      x={fitsInside ? x + width - 5 : x + width + 5}
      y={y + height / 2}
      dy={4}
      fill={fitsInside ? fill : "hsl(var(--foreground))"}
      textAnchor={fitsInside ? "end" : "start"}
      className="text-xs font-medium"
    >
      {formattedValue}
    </text>
  );
};


export function ExpensesByCategoryChart({ expenses }: ExpensesByCategoryChartProps) {
  const { categories } = useData();

  const chartData = useMemo(() => {
    if (!categories || categories.length === 0) return [];
    
    const dataByCategory = categories.map((category) => {
      const total = expenses
        .filter((expense) => expense.category === category.name)
        .reduce((sum, expense) => sum + expense.amount, 0);
      return {
        name: category.name,
        total: total,
      };
    }).filter(item => item.total > 0);

    return dataByCategory;
  }, [expenses, categories]);
  
  if (chartData.length === 0) {
    return <p className="text-muted-foreground text-center">Não há dados de despesas para exibir o gráfico.</p>
  }

  const chartConfig = {
    total: {
      label: "Total",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            left: 10,
            right: 50
          }}
        >
          <XAxis type="number" hide />
          <YAxis
            dataKey="name"
            type="category"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            width={120}
            tick={{ fill: 'hsl(var(--foreground))' }}
            tickFormatter={(value) => {
              if (value.length > 12) {
                return `${value.substring(0, 12)}...`;
              }
              return value;
            }}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent 
                formatter={(value) => formatCurrency(value as number)}
                indicator="dot" 
            />}
          />
          <Bar dataKey="total" fill="var(--color-total)" radius={5}>
             <LabelList
              dataKey="total"
              position="insideRight"
              content={<CustomLabel fill="#FFFFFF" />}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
```

---

### Arquivo: `src/components/charts/expenses-by-payment-method-chart.tsx`

```tsx
"use client"

import { useMemo } from "react";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, LabelList } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { Expense } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useData } from "@/context/data-context";

interface ExpensesByPaymentMethodChartProps {
  expenses: Expense[];
}

const CustomLabel = (props: any) => {
  const { x, y, width, height, value, fill } = props;
  const formattedValue = formatCurrency(value);
  const labelWidth = formattedValue.length * 7; // Approximate width of the label
  
  const fitsInside = width > labelWidth + 10;
  
  return (
    <text
      x={fitsInside ? x + width - 5 : x + width + 5}
      y={y + height / 2}
      dy={4}
      fill={fitsInside ? fill : "hsl(var(--foreground))"}
      textAnchor={fitsInside ? "end" : "start"}
      className="text-xs font-medium"
    >
      {formattedValue}
    </text>
  );
};

export function ExpensesByPaymentMethodChart({ expenses }: ExpensesByPaymentMethodChartProps) {
  const { paymentMethods } = useData();

  const chartData = useMemo(() => {
    if (!paymentMethods || paymentMethods.length === 0) return [];
    return paymentMethods.map((method) => {
      const total = expenses
        .filter((expense) => expense.paymentMethod === method.name)
        .reduce((sum, expense) => sum + expense.amount, 0);
      return {
        name: method.name,
        total: total,
      };
    }).filter(item => item.total > 0);
  }, [expenses, paymentMethods]);
  
  if (chartData.length === 0) {
    return <p className="text-muted-foreground text-center">Não há dados para exibir o gráfico.</p>
  }

  const chartConfig = {
    total: {
      label: "Total",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            left: 10,
            right: 50
          }}
        >
          <XAxis type="number" hide />
          <YAxis
            dataKey="name"
            type="category"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            width={120}
            tick={{ fill: 'hsl(var(--foreground))' }}
            tickFormatter={(value) => {
              if (value.length > 12) {
                return `${value.substring(0, 12)}...`;
              }
              return value;
            }}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent 
                formatter={(value) => formatCurrency(value as number)}
                indicator="dot" 
            />}
          />
          <Bar dataKey="total" fill="var(--color-total)" radius={5}>
             <LabelList
              dataKey="total"
              position="insideRight"
              content={<CustomLabel fill="#FFFFFF" />}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
```

---

### Arquivo: `src/components/charts/expenses-over-time-chart.tsx`

```tsx
"use client"
import { useMemo } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import type { Expense } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface ExpensesOverTimeChartProps {
  expenses: Expense[];
}

export function ExpensesOverTimeChart({ expenses }: ExpensesOverTimeChartProps) {
  const chartData = useMemo(() => {
    const dataByMonth: { [key: string]: { total: number; date: Date } } = {};

    expenses.forEach((expense) => {
        const expenseDate = new Date(expense.date);
        
        if (isNaN(expenseDate.getTime())) {
            return;
        }

        const monthKey = format(expenseDate, "yyyy-MM");

        if (!dataByMonth[monthKey]) {
            dataByMonth[monthKey] = { total: 0, date: expenseDate };
        }
        dataByMonth[monthKey].total += expense.amount;
    });

    return Object.entries(dataByMonth)
      .map(([key, data]) => {
          const [year, month] = key.split('-').map(Number);
          const monthName = format(new Date(year, month - 1), "MMM", { locale: ptBR });
          return {
            month: `${monthName.charAt(0).toUpperCase() + monthName.slice(1)}`,
            total: data.total,
            date: data.date,
          }
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());

  }, [expenses]);
  
  if (chartData.length === 0) {
    return <p className="text-muted-foreground text-center">Não há dados de despesas para exibir o gráfico.</p>
  }

  const chartConfig = {
    total: {
      label: "Despesas",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  // Rotate labels if there are more than 6 months to display to avoid overlap
  const xAxisProps = chartData.length > 6 
    ? { angle: -45, textAnchor: 'end' as const, height: 50, interval: 0 } 
    : { interval: 'preserveStartEnd' as const };

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartData} margin={{ left: -10, right: 20, top: 20, bottom: 20 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fill: 'hsl(var(--foreground))' }}
            {...xAxisProps}
          />
          <YAxis
            tickFormatter={(value) => formatCurrency(value as number)}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={90}
            tick={{ fill: 'hsl(var(--foreground))' }}
          />
          <ChartTooltip 
            cursor={false}
            content={<ChartTooltipContent 
                formatter={(value) => formatCurrency(value as number)}
                indicator="dot" 
            />}
            
            />
          <Area
            dataKey="total"
            type="monotone"
            fill="var(--color-total)"
            fillOpacity={0.4}
            stroke="var(--color-total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
```

---

### Arquivo: `src/components/charts/paid-vs-unpaid-chart.tsx`

```tsx
"use client"
import * as React from "react";
import { useMemo } from "react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import type { Expense } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface PaidVsUnpaidChartProps {
  expenses: Expense[];
}

const chartConfig = {
    paid: {
        label: "Pago",
        color: "hsl(var(--chart-2))",
    },
    unpaid: {
        label: "Pendente",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;

export function PaidVsUnpaidChart({ expenses }: PaidVsUnpaidChartProps) {
  const chartData = useMemo(() => {
    const paidAmount = expenses
      .filter((expense) => expense.paid)
      .reduce((sum, expense) => sum + expense.amount, 0);
    const unpaidAmount = expenses
      .filter((expense) => !expense.paid)
      .reduce((sum, expense) => sum + expense.amount, 0);

    return [
      { name: "Pago", value: paidAmount, fill: chartConfig.paid.color },
      { name: "Pendente", value: unpaidAmount, fill: chartConfig.unpaid.color },
    ].filter(item => item.value > 0);
  }, [expenses]);
  
  const totalAmount = useMemo(() => chartData.reduce((acc, curr) => acc + curr.value, 0), [chartData]);
  
  if (chartData.length === 0) {
    return <p className="text-muted-foreground text-center">Não há dados de despesas para exibir o gráfico.</p>
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <ChartTooltip 
            cursor={false}
            content={<ChartTooltipContent 
                formatter={(value) => formatCurrency(value as number)} 
                nameKey="name" 
                hideLabel
            />}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={60}
            paddingAngle={5}
            labelLine={false}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              percent,
              index,
            }) => {
              const RADIAN = Math.PI / 180;
              const radius = 25 + innerRadius + (outerRadius - innerRadius);
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="hsl(var(--foreground))"
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                  className="text-xs font-bold"
                >
                  {chartData[index].name} ({(percent * 100).toFixed(0)}%)
                </text>
              );
            }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
           <foreignObject width="100%" height="100%">
              <div className="flex justify-center items-center h-full">
                <p className="text-center text-lg font-bold">
                  Total
                  <span className="text-sm text-muted-foreground block">{formatCurrency(totalAmount)}</span>
                </p>
              </div>
          </foreignObject>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
```

---

### Arquivo: `src/components/dashboard-view.tsx`

```tsx
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpensesByCategoryChart } from "@/components/charts/expenses-by-category-chart";
import { ExpensesByPaymentMethodChart } from "@/components/charts/expenses-by-payment-method-chart";
import { PaidVsUnpaidChart } from "@/components/charts/paid-vs-unpaid-chart";
import type { Expense } from "@/lib/types";
import { BarChart, PieChart, CreditCard, LineChart } from "lucide-react";
import { ExpensesOverTimeChart } from "./charts/expenses-over-time-chart";

interface DashboardViewProps {
    expenses: Expense[];
}

export function DashboardView({ expenses }: DashboardViewProps) {
    return (
        <div className="flex flex-col gap-4 md:gap-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Despesas por Categoria</CardTitle>
                        <BarChart className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <ExpensesByCategoryChart expenses={expenses} />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Despesas por Pagamento</CardTitle>
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <ExpensesByPaymentMethodChart expenses={expenses} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Pagos vs. Pendentes</CardTitle>
                         <PieChart className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <PaidVsUnpaidChart expenses={expenses} />
                    </CardContent>
                </Card>
            </div>
             <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Despesas ao Longo do Ano</CardTitle>
                    <LineChart className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <ExpensesOverTimeChart expenses={expenses} />
                </CardContent>
            </Card>
        </div>
    );
}
```

---

### Arquivo: `src/components/expense-filters.tsx`

```tsx
"use client";

import { useState, useEffect } from "react";
import { X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useData } from "@/context/data-context";

type Status = "Todos" | "Pago" | "Pendente";

export interface Filters {
  category: string;
  paymentMethod: string;
  status: Status;
}

interface ExpenseFiltersProps {
  onFilterChange: (filters: Omit<Filters, 'dateRange'>) => void;
}

export function ExpenseFilters({ onFilterChange }: ExpenseFiltersProps) {
  const { categories, paymentMethods, loading } = useData();

  const [category, setCategory] = useState<string>("Todos");
  const [paymentMethod, setPaymentMethod] = useState<string>("Todos");
  const [status, setStatus] = useState<Status>("Todos");

  useEffect(() => {
    onFilterChange({
      category,
      paymentMethod,
      status,
    });
  }, [category, paymentMethod, status, onFilterChange]);
  
  const resetFilters = () => {
    setCategory("Todos");
    setPaymentMethod("Todos");
    setStatus("Todos");
  }

  return (
      <div className="flex flex-col md:flex-row items-center gap-2 py-4">
        <div className="flex items-center gap-2 font-semibold text-sm md:text-base">
            <Filter className="h-4 w-4" />
            Filtros
        </div>
        <Select value={category} onValueChange={setCategory} disabled={loading}>
          <SelectTrigger className="w-full md:w-[160px] bg-card">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Categorias</SelectItem>
            {categories.map(cat => <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={paymentMethod} onValueChange={setPaymentMethod} disabled={loading}>
          <SelectTrigger className="w-full md:w-[160px] bg-card">
            <SelectValue placeholder="Pagamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Pagamentos</SelectItem>
            {paymentMethods.map(method => <SelectItem key={method.id} value={method.name}>{method.name}</SelectItem>)}
          </SelectContent>
        </Select>
         <Select value={status} onValueChange={(value) => setStatus(value as Status)}>
          <SelectTrigger className="w-full md:w-[120px] bg-card">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Status</SelectItem>
            <SelectItem value="Pago">Pago</SelectItem>
            <SelectItem value="Pendente">Pendente</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" onClick={resetFilters} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm">
            <X className="h-4 w-4" />
            Limpar
        </Button>
      </div>
  );
}
```

---

### Arquivo: `src/components/expense-form.tsx`

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type Expense } from '@/lib/types';
import { Checkbox } from './ui/checkbox';
import { useData } from '@/context/data-context';
import { ScrollArea } from './ui/scroll-area';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

const formSchema = z.object({
  description: z.string().min(2, 'A descrição deve ter pelo menos 2 caracteres.'),
  amount: z.coerce.number().positive('O valor deve ser positivo.'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Data inválida' }),
  category: z.string({ required_error: 'A categoria é obrigatória.' }),
  paymentMethod: z.string({ required_error: 'A forma de pagamento é obrigatória.' }),
  bank: z.string().optional(),
  paid: z.boolean().default(false),
  expenseType: z.enum(['single', 'installment', 'recurring']).default('single'),
  totalInstallments: z.coerce.number().min(1).max(100).default(1),
});

type ExpenseFormData = z.infer<typeof formSchema>;

interface ExpenseFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  addExpense: (data: Omit<Expense, 'id' | 'installments'> & { totalInstallments: number }, onComplete?: () => void) => void;
  updateExpense: (expense: Expense, updateFuture: boolean, onComplete?: () => void) => Promise<void>;
  expenseToEdit: Expense | null;
}

export function ExpenseForm({
  isOpen,
  onOpenChange,
  addExpense,
  updateExpense,
  expenseToEdit,
}: ExpenseFormProps) {
  const isEditMode = !!expenseToEdit;
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [formData, setFormData] = useState<ExpenseFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { categories, paymentMethods, banks, loading } = useData();

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      paid: false,
      expenseType: 'single',
      totalInstallments: 1,
      bank: '',
    },
  });

  const expenseType = form.watch('expenseType');

  useEffect(() => {
    if (isOpen) {
      if (expenseToEdit) {
        let type: 'single' | 'installment' | 'recurring' = 'single';
        if (expenseToEdit.isRecurring) {
          type = 'recurring';
        } else if (expenseToEdit.installments && expenseToEdit.installments.total > 1) {
          type = 'installment';
        }

        form.reset({
          description: expenseToEdit.description,
          amount: expenseToEdit.amount,
          date: expenseToEdit.date.split('T')[0],
          category: expenseToEdit.category,
          paymentMethod: expenseToEdit.paymentMethod,
          bank: expenseToEdit.bank || '',
          paid: expenseToEdit.paid,
          expenseType: type,
          totalInstallments: expenseToEdit.installments?.total || 1,
        });
      } else {
        form.reset({
          description: '',
          amount: 0,
          date: new Date().toISOString().split('T')[0],
          category: undefined,
          paymentMethod: undefined,
          bank: '',
          paid: false,
          expenseType: 'single',
          totalInstallments: 1,
        });
      }
    }
  }, [expenseToEdit, isOpen, form]);

  const performSubmit = async (data: ExpenseFormData, updateFuture: boolean = false): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      const finalData = {
        ...data,
        isRecurring: data.expenseType === 'recurring',
        totalInstallments: data.expenseType === 'recurring' ? 100 : (data.expenseType === 'installment' ? data.totalInstallments : 1),
      };

      if (isEditMode && expenseToEdit) {
        const updatedData: Expense = {
          ...expenseToEdit,
          ...finalData,
        };
        await updateExpense(updatedData, updateFuture, () => onOpenChange(false));
      } else {
         addExpense(finalData, () => onOpenChange(false));
      }
      return true;
    } catch (error) {
      console.error("Falha ao enviar formulário", error);
      return false;
    } finally {
        setIsSubmitting(false);
    }
  };

  async function onSubmit(data: ExpenseFormData) {
    if (isEditMode && expenseToEdit?.installments && expenseToEdit.installments.total > 1) {
      setFormData(data);
      setShowUpdateAlert(true);
    } else {
       await performSubmit(data);
    }
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent className="sm:max-w-lg w-[90vw]">
          <SheetHeader>
            <SheetTitle>{isEditMode ? 'Editar Despesa' : 'Adicionar Despesa'}</SheetTitle>
            {isEditMode && expenseToEdit?.installments && !expenseToEdit.isRecurring && (
              <SheetDescription>
                Esta é a parcela {expenseToEdit.installments.current} de {expenseToEdit.installments.total}.
              </SheetDescription>
            )}
            {isEditMode && expenseToEdit?.isRecurring && (
              <SheetDescription>Esta é uma despesa fixa.</SheetDescription>
            )}
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Compras no supermercado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data da Despesa</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger disabled={loading}>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.name}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Forma de Pagamento</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger disabled={loading}>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {paymentMethods.map((method) => (
                            <SelectItem key={method.id} value={method.name}>
                              {method.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instituição / Banco</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ''}>
                        <FormControl>
                           <SelectTrigger disabled={loading}>
                            <SelectValue placeholder="Selecione o banco (opcional)..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {banks.map((bank) => (
                            <SelectItem key={bank.id} value={bank.name}>
                              {bank.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-4 rounded-md border p-4 shadow">
                  <FormField
                    control={form.control}
                    name="expenseType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Tipo de Lançamento</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-col space-y-1"
                            disabled={isEditMode}
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="single" />
                              </FormControl>
                              <FormLabel className="font-normal">Despesa Única</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="installment" />
                              </FormControl>
                              <FormLabel className="font-normal">Despesa Parcelada</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="recurring" />
                              </FormControl>
                              <FormLabel className="font-normal">Despesa Fixa (Recorrente)</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {expenseType === 'installment' && (
                    <FormField
                      control={form.control}
                      name="totalInstallments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de Parcelas</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="2"
                              max="100"
                              {...field}
                              disabled={isEditMode}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <FormField
                  control={form.control}
                  name="paid"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Marcar como paga</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <SheetFooter className="pt-4">
                   <SheetClose asChild>
                    <Button type="button" variant="outline">
                        Cancelar
                    </Button>
                  </SheetClose>
                  <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : 'Salvar'}</Button>
                </SheetFooter>
              </form>
            </Form>
          </ScrollArea>
           {isEditMode && (
              <AlertDialog open={showUpdateAlert} onOpenChange={setShowUpdateAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Atualizar parcelas?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Você deseja aplicar esta alteração somente para esta parcela ou para esta e todas as futuras?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                         <Button
                            variant="outline"
                            onClick={async () => {
                              if (!formData) return;
                              const success = await performSubmit(formData, false);
                              if (success) {
                                setShowUpdateAlert(false);
                                onOpenChange(false);
                              }
                            }}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Salvando...' : 'Apenas esta'}
                          </Button>
                          <Button
                            onClick={async () => {
                              if (!formData) return;
                              const success = await performSubmit(formData, true);
                              if (success) {
                                setShowUpdateAlert(false);
                                onOpenChange(false);
                              }
                            }}
                            disabled={isSubmitting}
                          >
                             {isSubmitting ? 'Salvando...' : 'Esta e as futuras'}
                          </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
        </SheetContent>
      </Sheet>
    </>
  );
}
```

---

### Arquivo: `src/components/expense-list.tsx`

```tsx
'use client';

import { useMemo } from 'react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';
import { ReceiptText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Expense } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { getCategoryIcon, getPaymentMethodIcon } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface ExpenseListProps {
  expenses: Expense[];
  selectedExpenses: string[];
  onSelectionChange: (ids: string[]) => void;
}

export function ExpenseList({
  expenses,
  selectedExpenses,
  onSelectionChange,
}: ExpenseListProps) {

  const handleSelectAll = (checked: boolean) => {
    onSelectionChange(checked ? expenses.map((e) => e.id) : []);
  };

  const handleRowSelect = (expenseId: string, checked: boolean) => {
    const newSelection = checked
      ? [...selectedExpenses, expenseId]
      : selectedExpenses.filter((id) => id !== expenseId);
    onSelectionChange(newSelection);
  };

  const isAllSelected = useMemo(() => {
    return expenses.length > 0 && selectedExpenses.length === expenses.length;
  }, [expenses, selectedExpenses]);

  if (expenses.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-10 gap-4">
          <ReceiptText className="w-16 h-16 text-muted-foreground" />
          <h3 className="text-xl font-semibold">Nenhuma despesa este mês</h3>
          <p className="text-muted-foreground">
            Adicione sua primeira despesa para começar.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px] px-2">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={(checked) => handleSelectAll(!!checked)}
                  aria-label="Selecionar tudo"
                />
              </TableHead>
              <TableHead className="w-[50px] hidden sm:table-cell"></TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Pagamento</TableHead>
              <TableHead className="hidden md:table-cell">Data</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => {
              const CategoryIcon = getCategoryIcon(expense.category);
              const PaymentIcon = getPaymentMethodIcon(expense.paymentMethod);
              const zonedDate = toZonedTime(expense.date, 'UTC');

              return (
                <TableRow
                  key={expense.id}
                  className={cn(
                    expense.paid && 'bg-green-100/40 dark:bg-green-900/20',
                    'cursor-pointer'
                  )}
                  data-state={selectedExpenses.includes(expense.id) && 'selected'}
                  onClick={() => {
                      const isSelected = selectedExpenses.includes(expense.id);
                      handleRowSelect(expense.id, !isSelected);
                  }}
                >
                  <TableCell className="px-2" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedExpenses.includes(expense.id)}
                      onCheckedChange={(checked) =>
                        handleRowSelect(expense.id, !!checked)
                      }
                      aria-label={`Selecionar despesa ${expense.description}`}
                    />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                  </TableCell>
                  <TableCell className="font-medium">
                    {expense.description}
                    {expense.isRecurring ? (
                      <Badge variant="outline" className="ml-2">
                        Fixo
                      </Badge>
                    ) : (
                      expense.installments && (
                        <Badge variant="outline" className="ml-2">
                          {expense.installments.current}/
                          {expense.installments.total}
                        </Badge>
                      )
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={expense.paid ? 'default' : 'secondary'}
                      className={cn(
                        expense.paid ? 'bg-green-600' : 'bg-orange-500',
                        'text-white'
                      )}
                    >
                      {expense.paid ? 'Pago' : 'Pendente'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      {PaymentIcon && (
                        <PaymentIcon className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span>
                        {expense.paymentMethod}{' '}
                        {expense.bank && `(${expense.bank})`}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(zonedDate, 'dd/MM/yyyy', { locale: ptBR })}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(expense.amount)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
```

---

### Arquivo: `src/components/expenses-view.tsx`

```tsx
'use client';

import { useState } from "react";
import { Wallet, MinusCircle, DollarSign, CheckCircle, Landmark, Trash2, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseList } from "@/components/expense-list";
import { Input } from "@/components/ui/input";
import { formatCurrency, cn } from "@/lib/utils";
import type { Expense } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';


interface ExpensesViewProps {
    expenses: Expense[];
    salary: number;
    updateSalary: (salary: number) => void;
    onEdit: (expense: Expense) => void;
    onDelete: (expenseId: string, deleteFuture: boolean, installments: Expense['installments']) => Promise<void>;
    onBulkDelete: (ids: string[]) => void;
    onBulkUpdatePaid: (ids: string[], paid: boolean) => void;
}

export function ExpensesView({
    expenses,
    salary,
    updateSalary,
    onEdit,
    onDelete,
    onBulkDelete,
    onBulkUpdatePaid,
}: ExpensesViewProps) {
    const [selectedExpenses, setSelectedExpenses] = useState<string[]>([]);
     const [deleteAlert, setDeleteAlert] = useState<{
        isOpen: boolean;
        expense: Expense | null;
      }>({ isOpen: false, expense: null });
    
    const totalExpenses = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );
    
    const totalPaidExpenses = expenses
        .filter(expense => expense.paid)
        .reduce((sum, expense) => sum + expense.amount, 0);

    const remainingBalance = salary - totalPaidExpenses;
    
    const handleBulkDelete = () => {
        if (selectedExpenses.length === 1) {
            const expense = expenses.find(exp => exp.id === selectedExpenses[0]);
            if (expense && (expense.isRecurring || (expense.installments && expense.installments.total > 1))) {
                setDeleteAlert({ isOpen: true, expense });
                return;
            }
        }
        onBulkDelete(selectedExpenses);
        setSelectedExpenses([]);
    };
    
    const confirmDelete = async (deleteFuture: boolean) => {
        if (deleteAlert.expense) {
            await onDelete(
                deleteAlert.expense.id,
                deleteFuture,
                deleteAlert.expense.installments
            );
        }
        setDeleteAlert({ isOpen: false, expense: null });
        setSelectedExpenses([]);
    };

    const handleBulkUpdatePaid = (paid: boolean) => {
        onBulkUpdatePaid(selectedExpenses, paid);
        setSelectedExpenses([]);
    };

    const handleEdit = () => {
        if (selectedExpenses.length !== 1) return;
        const expenseToEdit = expenses.find(exp => exp.id === selectedExpenses[0]);
        if (expenseToEdit) {
            onEdit(expenseToEdit);
            setSelectedExpenses([]);
        }
    }

    return (
        <div className="flex flex-col gap-4 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Salário Mensal</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-muted-foreground" />
                            <Input
                                type="number"
                                placeholder="Seu salário"
                                className="text-2xl font-bold border-none p-0 h-auto focus-visible:ring-0"
                                value={salary || ""}
                                onChange={(e) => updateSalary(Number(e.target.value))}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Despesas</CardTitle>
                        <MinusCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(totalExpenses)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Total de despesas do período
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(totalPaidExpenses)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Soma das contas pagas no período
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Saldo Restante</CardTitle>
                        <Landmark className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className={cn(
                            "text-2xl font-bold",
                            remainingBalance > 0 ? "text-green-600" : "text-red-600"
                            )}>
                            {formatCurrency(remainingBalance)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Salário - despesas pagas
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Separator className="my-4" />

             <div className="space-y-4">
                 {selectedExpenses.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-muted/50 rounded-lg justify-between">
                         <p className="text-sm font-medium text-muted-foreground">
                            {selectedExpenses.length} item(s) selecionado(s)
                        </p>
                        <div className="flex gap-2 flex-wrap justify-center">
                            <Button size="sm" variant="outline" onClick={() => handleBulkUpdatePaid(true)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Pago
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleBulkUpdatePaid(false)}>
                                <MinusCircle className="mr-2 h-4 w-4" />
                                Não Pago
                            </Button>
                            {selectedExpenses.length === 1 && (
                                <Button size="sm" variant="outline" onClick={handleEdit}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Editar
                                </Button>
                            )}
                            <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                            </Button>
                        </div>
                    </div>
                 )}
                <h2 className="text-2xl font-bold tracking-tight">Despesas</h2>
                <ExpenseList
                    expenses={expenses}
                    selectedExpenses={selectedExpenses}
                    onSelectionChange={setSelectedExpenses}
                />
            </div>
             <AlertDialog
                open={deleteAlert.isOpen}
                onOpenChange={(isOpen) =>
                setDeleteAlert({ isOpen, expense: isOpen ? deleteAlert.expense : null })
                }
            >
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                    Esta ação não pode ser desfeita.
                    {deleteAlert.expense?.installments && !deleteAlert.expense.isRecurring &&
                        ' Esta é uma despesa parcelada.'}
                    {deleteAlert.expense?.isRecurring &&
                        ' Esta é uma despesa recorrente.'}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    {(deleteAlert.expense?.installments || deleteAlert.expense?.isRecurring) ? (
                    <>
                        <Button variant="outline" onClick={() => confirmDelete(false)}>Excluir só esta</Button>
                        <Button variant="destructive" onClick={() => confirmDelete(true)}>Excluir esta e futuras</Button>
                    </>
                    ) : (
                    <AlertDialogAction
                        onClick={() => confirmDelete(false)}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        Confirmar Exclusão
                    </AlertDialogAction>
                    )}
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
```

---

### Arquivo: `src/components/logo.tsx`

```tsx
import { Wallet } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Wallet className="h-7 w-7 text-primary" />
      <span className="whitespace-nowrap text-xl font-bold tracking-tight">
        Controle Fácil
      </span>
    </div>
  );
}
```

---

### Arquivo: `src/components/month-navigator.tsx`

```tsx
"use client";

import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface MonthNavigatorProps {
  currentDate: string; // YYYY-MM-DD
  onDateChange: (newDate: string) => void;
}

export function MonthNavigator({
  currentDate,
  onDateChange,
}: MonthNavigatorProps) {
  
  const [year, month, day] = currentDate.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);

  const handlePreviousMonth = () => {
    onDateChange(subMonths(dateObj, 1).toISOString().split('T')[0]);
  };

  const handleNextMonth = () => {
    onDateChange(addMonths(dateObj, 1).toISOString().split('T')[0]);
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(date.toISOString().split('T')[0]);
    }
  }

  const formattedDate = format(dateObj, "MMMM/yyyy", { locale: ptBR });

  return (
    <div className="flex items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="text-2xl font-bold capitalize tracking-tight p-2 h-auto">
            {formattedDate}
            <CalendarIcon className="ml-2 h-5 w-5 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dateObj}
            onSelect={handleDateSelect}
            initialFocus
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handlePreviousMonth}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Mês anterior</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleNextMonth}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Próximo mês</span>
        </Button>
      </div>
    </div>
  );
}
```

---

### Arquivo: `src/components/payment-method-manager.tsx`

```tsx
'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useData } from '@/context/data-context';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { PaymentMethod } from '@/lib/types';


const formSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
});

interface PaymentMethodFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  addPaymentMethod: (data: { name: string }) => void;
  updatePaymentMethod: (method: PaymentMethod) => void;
  methodToEdit: PaymentMethod | null;
}

function PaymentMethodForm({
  isOpen,
  onOpenChange,
  addPaymentMethod,
  updatePaymentMethod,
  methodToEdit,
}: PaymentMethodFormProps) {
  const isEditMode = !!methodToEdit;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (methodToEdit) {
      form.reset({ name: methodToEdit.name });
    } else {
      form.reset({ name: '' });
    }
  }, [methodToEdit, form, isOpen]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (isEditMode && methodToEdit) {
      updatePaymentMethod({ ...methodToEdit, ...data });
    } else {
      addPaymentMethod(data);
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Forma de Pagamento' : 'Adicionar Forma de Pagamento'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Forma de Pagamento</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Cartão de Crédito" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


export function PaymentMethodManager() {
  const { paymentMethods, addPaymentMethod, updatePaymentMethod, deletePaymentMethod, loading } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [methodToEdit, setMethodToEdit] = useState<PaymentMethod | null>(null);
  const [deleteAlert, setDeleteAlert] = useState<{isOpen: boolean, methodId: string | null}>({isOpen: false, methodId: null});

  const handleAdd = () => {
    setMethodToEdit(null);
    setIsFormOpen(true);
  };

  const handleEdit = (method: PaymentMethod) => {
    setMethodToEdit(method);
    setIsFormOpen(true);
  };

  const handleDelete = (methodId: string) => {
    setDeleteAlert({isOpen: true, methodId});
  };

  const confirmDelete = () => {
    if (deleteAlert.methodId) {
        deletePaymentMethod(deleteAlert.methodId);
    }
    setDeleteAlert({isOpen: false, methodId: null});
  }

  if (loading) {
    return <p>Carregando formas de pagamento...</p>;
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Forma de Pagamento
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentMethods.map((method) => (
              <TableRow key={method.id}>
                <TableCell>{method.name}</TableCell>
                <TableCell>
                <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(method)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(method.id)} className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaymentMethodForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        addPaymentMethod={addPaymentMethod}
        updatePaymentMethod={updatePaymentMethod}
        methodToEdit={methodToEdit}
      />

       <AlertDialog open={deleteAlert.isOpen} onOpenChange={(isOpen) => setDeleteAlert({isOpen, methodId: isOpen ? deleteAlert.methodId : null})}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Isso excluirá permanentemente a forma de pagamento.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
                        Excluir
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}
```

---

### Arquivo: `src/components/theme-toggle.tsx`

```tsx
"use client"
 
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
export function ThemeToggle() {
  const { setTheme } = useTheme()
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

---

### Arquivo: `src/components/ui/accordion.tsx`

```tsx
"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

---

### Arquivo: `src/components/ui/alert-dialog.tsx`

```tsx
"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
```

---

### Arquivo: `src/components/ui/alert.tsx`

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
```

---

### Arquivo: `src/components/ui/avatar.tsx`

```tsx
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
```

---

### Arquivo: `src/components/ui/badge.tsx`

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```

---

### Arquivo: `src/components/ui/button.tsx`

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

---

### Arquivo: `src/components/ui/calendar.tsx`

```tsx
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
```

---

### Arquivo: `src/components/ui/card.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

---

### Arquivo: `src/components/ui/carousel.tsx`

```tsx
"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
```

---

### Arquivo: `src/components/ui/chart.tsx`

```tsx
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
```

---

### Arquivo: `src/components/ui/checkbox.tsx`

```tsx
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
```

---

### Arquivo: `src/components/ui/collapsible.tsx`

```tsx
"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
```

---

### Arquivo: `src/components/ui/dialog.tsx`

```tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
```

---

### Arquivo: `src/components/ui/dropdown-menu.tsx`

```tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
```

---

### Arquivo: `src/components/ui/form.tsx`

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
```

---

### Arquivo: `src/components/ui/input.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

---

### Arquivo: `src/components/ui/label.tsx`

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
```

---

### Arquivo: `src/components/ui/menubar.tsx`

```tsx
"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
```

---

### Arquivo: `src/components/ui/popover.tsx`

```tsx
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
```

---

### Arquivo: `src/components/ui/progress.tsx`

```tsx
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
```

---

### Arquivo: `src/components/ui/radio-group.tsx`

```tsx
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
```

---

### Arquivo: `src/components/ui/scroll-area.tsx`

```tsx
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
```

---

### Arquivo: `src/components/ui/select.tsx`

```tsx
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
```

---

### Arquivo: `src/components/ui/separator.tsx`

```tsx
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
```

---

### Arquivo: `src/components/ui/sheet.tsx`

```tsx
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
```

---

### Arquivo: `src/components/ui/skeleton.tsx`

```tsx
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
```

---

### Arquivo: `src/components/ui/slider.tsx`

```tsx
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
```

---

### Arquivo: `src/components/ui/switch.tsx`

```tsx
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
```

---

### Arquivo: `src/components/ui/table.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
```

---

### Arquivo: `src/components/ui/tabs.tsx`

```tsx
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
```

---

### Arquivo: `src/components/ui/textarea.tsx`

```tsx
import * as React from 'react';

import {cn} from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export {Textarea};
```

---

### Arquivo: `src/components/ui/toast.tsx`

```tsx
"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
```

---

### Arquivo: `src/components/ui/toaster.tsx`

```tsx
"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
```

---

### Arquivo: `src/components/ui/tooltip.tsx`

```tsx
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
```

---

### Arquivo: `src/context/data-context.tsx`

```tsx
'use client';
import { createContext, useContext, useMemo, ReactNode } from 'react';
import { useUser, useFirestore, useMemoFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useDoc } from '@/firebase/firestore/use-doc';
import { useToast } from '@/hooks/use-toast';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
  query,
  where,
  getDocs,
  Timestamp,
  setDoc,
  deleteField,
} from 'firebase/firestore';
import { addMonths, startOfDay } from 'date-fns';

import type { Bank, Category, PaymentMethod, Expense, UserProfile } from '@/lib/types';

interface DataContextValue {
  // Data
  banks: Bank[];
  categories: Category[];
  paymentMethods: PaymentMethod[];
  expenses: Expense[];
  salary: number;
  userProfile: UserProfile | null;
  
  // Loading State
  loading: boolean;

  // Mutators
  addBank: (data: { name: string }) => void;
  updateBank: (bank: Bank) => void;
  deleteBank: (bankId: string) => void;

  addCategory: (data: { name: string }) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (categoryId: string) => void;

  addPaymentMethod: (data: { name: string }) => void;
  updatePaymentMethod: (method: PaymentMethod) => void;
  deletePaymentMethod: (methodId: string) => void;

  addExpense: (expenseData: Omit<Expense, "id" | "installments"> & { totalInstallments: number }, onComplete?: () => void) => void;
  updateExpense: (updatedExpense: Expense, updateFuture: boolean, onComplete?: () => void) => Promise<void>;
  deleteExpense: (expenseId: string, deleteFuture: boolean, installmentsInfo: Expense["installments"]) => Promise<void>;
  bulkUpdatePaidStatus: (expenseIds: string[], paid: boolean) => void;
  bulkDeleteExpenses: (expenseIds: string[]) => void;

  updateSalary: (newSalary: number) => void;
  updateUserProfile: (profileData: Omit<UserProfile, 'id'>) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const userId = user?.uid;

  // --- DATA FETCHING ---
  const banksQuery = useMemoFirebase(() => userId ? query(collection(firestore, 'users', userId, 'banks')) : null, [firestore, userId]);
  const { data: banksData, loading: banksLoading } = useCollection<Bank>(banksQuery);

  const categoriesQuery = useMemoFirebase(() => userId ? query(collection(firestore, 'users', userId, 'categories')) : null, [firestore, userId]);
  const { data: categoriesData, loading: categoriesLoading } = useCollection<Category>(categoriesQuery);

  const paymentMethodsQuery = useMemoFirebase(() => userId ? query(collection(firestore, 'users', userId, 'paymentMethods')) : null, [firestore, userId]);
  const { data: paymentMethodsData, loading: paymentMethodsLoading } = useCollection<PaymentMethod>(paymentMethodsQuery);

  const expensesQuery = useMemoFirebase(() => userId ? query(collection(firestore, 'users', userId, 'expenses')) : null, [firestore, userId]);
  const { data: expensesData, loading: expensesLoading } = useCollection<Expense>(expensesQuery);

  const salaryDocRef = useMemoFirebase(() => userId ? doc(firestore, "users", userId, "settings", "salary") : null, [userId, firestore]);
  const { data: salaryData, loading: salaryLoading } = useDoc<{amount: number}>(salaryDocRef);

  const profileDocRef = useMemoFirebase(() => userId ? doc(firestore, 'users', userId, 'profile', 'main') : null, [firestore, userId]);
  const { data: userProfile, loading: profileLoading } = useDoc<UserProfile>(profileDocRef);


  // --- DATA MEMOIZATION AND TRANSFORMATION ---
  const banks = useMemo(() => banksData ? [...banksData].sort((a, b) => a.name.localeCompare(b.name)) : [], [banksData]);
  const categories = useMemo(() => categoriesData ? [...categoriesData].sort((a, b) => a.name.localeCompare(b.name)) : [], [categoriesData]);
  const paymentMethods = useMemo(() => paymentMethodsData ? [...paymentMethodsData].sort((a, b) => a.name.localeCompare(b.name)) : [], [paymentMethodsData]);
  const salary = useMemo(() => salaryData?.amount || 0, [salaryData]);

  const expenses = useMemo(() => {
    if (!expensesData) return [];
    const sorted = expensesData.map(d => {
        const dateValue = d.date;
        let finalDate: string;
        if (dateValue instanceof Timestamp) finalDate = dateValue.toDate().toISOString().split('T')[0];
        else if (typeof dateValue === 'string') finalDate = dateValue;
        else if (dateValue && (dateValue as any).toDate) finalDate = (dateValue as any).toDate().toISOString().split('T')[0];
        else finalDate = new Date().toISOString().split('T')[0];
        return { ...d, date: finalDate };
    });
    return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expensesData]);

  const loading = banksLoading || categoriesLoading || paymentMethodsLoading || expensesLoading || salaryLoading || profileLoading;

  // --- MUTATORS (Generic CRUD for settings) ---
  const createCrudFunctions = <T extends {id: string, name: string}>(collectionName: string, singularName: string) => {
    const collectionRef = userId ? collection(firestore, 'users', userId, collectionName) : null;

    const addItem = (data: { name: string }) => {
      if (!collectionRef) return;
      const dataWithTimestamp = { ...data, createdAt: Timestamp.now() };
      addDoc(collectionRef, dataWithTimestamp).then(() => {
        toast({ title: 'Sucesso!', description: `${singularName} adicionado(a).` });
      }).catch(e => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: collectionRef.path, operation: 'create', requestResourceData: dataWithTimestamp }));
        toast({ title: 'Erro!', description: `Não foi possível adicionar ${singularName.toLowerCase()}.`, variant: 'destructive' });
      });
    };

    const updateItem = (item: T) => {
      if (!userId) return;
      const { id, ...dataToUpdate } = item;
      const docRef = doc(firestore, 'users', userId, collectionName, id);
      updateDoc(docRef, dataToUpdate).then(() => {
        toast({ title: 'Sucesso!', description: `${singularName} atualizado(a).` });
      }).catch(e => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: docRef.path, operation: 'update', requestResourceData: dataToUpdate }));
        toast({ title: 'Erro!', description: `Não foi possível atualizar ${singularName.toLowerCase()}.`, variant: 'destructive' });
      });
    };

    const deleteItem = (itemId: string) => {
      if (!userId) return;
      const docRef = doc(firestore, 'users', userId, collectionName, itemId);
      deleteDoc(docRef).then(() => {
        toast({ title: 'Sucesso!', description: `${singularName} excluído(a).`, variant: 'destructive' });
      }).catch(e => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: docRef.path, operation: 'delete' }));
        toast({ title: 'Erro!', description: `Não foi possível excluir ${singularName.toLowerCase()}.`, variant: 'destructive' });
      });
    };

    return { addItem, updateItem, deleteItem };
  };

  const { addItem: addBank, updateItem: updateBank, deleteItem: deleteBank } = createCrudFunctions<Bank>('banks', 'Banco');
  const { addItem: addCategory, updateItem: updateCategory, deleteItem: deleteCategory } = createCrudFunctions<Category>('categories', 'Categoria');
  const { addItem: addPaymentMethod, updateItem: updatePaymentMethod, deleteItem: deletePaymentMethod } = createCrudFunctions<PaymentMethod>('paymentMethods', 'Forma de Pagamento');

  // --- EXPENSE MUTATORS ---
  const addExpense = (expenseData: Omit<Expense, "id" | "installments"> & { totalInstallments: number }, onComplete?: () => void) => {
    if (!firestore || !userId) return;
    const { totalInstallments, amount, date, isRecurring, ...rest } = expenseData;
    const collectionRef = collection(firestore, "users", userId, "expenses");
  
    const cleanData: any = { ...rest };
    if (!cleanData.bank) {
      delete cleanData.bank;
    }
  
    if (totalInstallments > 1) {
      const batch = writeBatch(firestore);
      const parentId = doc(collection(firestore, "tmp")).id;
      const entryAmount = isRecurring ? amount : amount / totalInstallments;
      const baseDate = startOfDay(new Date(date));
  
      for (let i = 0; i < totalInstallments; i++) {
        const entryDate = addMonths(baseDate, i);
        const newDocRef = doc(collectionRef);
        const newEntry: Omit<Expense, 'id'> = {
          ...cleanData,
          amount: entryAmount,
          date: entryDate.toISOString().split('T')[0],
          paid: i === 0 ? expenseData.paid : false,
          isRecurring: isRecurring || false,
          installments: { parentId, current: i + 1, total: totalInstallments },
        };
        batch.set(newDocRef, newEntry);
      }
      batch.commit().then(() => {
        if (!isRecurring) toast({ title: "Sucesso!", description: `${totalInstallments} parcelas foram adicionadas.` });
        onComplete?.();
      }).catch(e => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: collectionRef.path, operation: 'create', requestResourceData: { details: `Batch write for ${totalInstallments} installments.` } }));
        toast({ title: "Erro de Permissão!", description: "Não foi possível adicionar as despesas parceladas.", variant: 'destructive' });
      });
    } else {
      const expensePayload: any = { ...cleanData, amount, date, isRecurring: isRecurring || false, paid: expenseData.paid };
      addDoc(collectionRef, expensePayload).then(() => {
        if (!isRecurring) toast({ title: "Sucesso!", description: "Sua despesa foi adicionada." });
        onComplete?.();
      }).catch(e => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: collectionRef.path, operation: 'create', requestResourceData: expensePayload }));
        toast({ title: "Erro!", description: "Ocorreu um erro ao adicionar a despesa.", variant: 'destructive' });
      });
    }
  };

  const updateExpense = async (updatedExpense: Expense, updateFuture: boolean, onComplete?: () => void): Promise<void> => {
    if (!firestore || !userId) {
      throw new Error("Firestore ou usuário não disponível.");
    }
  
    const { id, ...dataToUpdate } = { ...updatedExpense };
    if (!dataToUpdate.bank) {
      (dataToUpdate as any).bank = deleteField();
    }
  
    try {
      if (updateFuture && dataToUpdate.installments) {
        const batch = writeBatch(firestore);
        const { parentId, current } = dataToUpdate.installments;
        const q = query(collection(firestore, "users", userId, "expenses"), where("installments.parentId", "==", parentId));
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((docSnap) => {
          const docData = docSnap.data();
          if (docData.installments && docData.installments.current >= current) {
            const docRef = doc(firestore, "users", userId, "expenses", docSnap.id);
            // Destructure to remove fields that should not be batch updated on all future items
            const { id: expenseId, installments, paid, date, ...baseUpdateData} = dataToUpdate;
            
            if (docSnap.id === id) { 
              // Update the current doc with all changes
              batch.update(docRef, { ...baseUpdateData, paid, date });
            } else { 
              // Only update shared fields for future docs
              const futureUpdateData: any = {
                description: baseUpdateData.description,
                amount: baseUpdateData.isRecurring ? baseUpdateData.amount : docData.amount,
                category: baseUpdateData.category,
                paymentMethod: baseUpdateData.paymentMethod,
              };
              if (baseUpdateData.bank) {
                  futureUpdateData.bank = baseUpdateData.bank;
              } else {
                  futureUpdateData.bank = deleteField();
              }
              batch.update(docRef, futureUpdateData);
            }
          }
        });
        await batch.commit();
        toast({ title: "Sucesso!", description: "Parcelas atualizadas." });
      } else {
        const { installments, ...singleDataToUpdate } = dataToUpdate;
        const docRef = doc(firestore, "users", userId, "expenses", id);
        await updateDoc(docRef, singleDataToUpdate);
        toast({ title: "Sucesso!", description: "Despesa atualizada." });
      }
      onComplete?.();
    } catch (e) {
      const pathForError = `/users/${userId}/expenses/${updatedExpense.id}`;
      errorEmitter.emit('permission-error', new FirestorePermissionError({ path: pathForError, operation: 'update', requestResourceData: dataToUpdate }));
      toast({ title: "Erro!", description: "Ocorreu um erro ao atualizar a despesa.", variant: 'destructive' });
      throw e; // Re-throw the error to be caught by the caller
    }
  };

  const deleteExpense = async (expenseId: string, deleteFuture: boolean, installmentsInfo: Expense["installments"]): Promise<void> => {
    if (!firestore || !userId) return;
    
    const expenseToDelete = expenses.find(exp => exp.id === expenseId);
    if (!expenseToDelete) return;
    
    const isRecurring = expenseToDelete.isRecurring;
    const isInstallment = !!installmentsInfo;

    try {
        if (deleteFuture && (isInstallment || isRecurring)) {
            const batch = writeBatch(firestore);
            // We must use the parentId from the expense to be deleted
            const parentId = expenseToDelete.installments?.parentId;
            const currentInstallment = expenseToDelete.installments?.current || 0;
            
            if (!parentId) {
                // This case handles a single recurring expense that might not have a parentId yet.
                // Or if something went wrong. Just delete the single one.
                 const docRef = doc(firestore, "users", userId, "expenses", expenseId);
                 await deleteDoc(docRef);
                 toast({ title: "Sucesso!", description: "Despesa removida.", variant: 'destructive' });
                 return;
            }

            const q = query(collection(firestore, "users", userId, "expenses"), where("installments.parentId", "==", parentId));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(docSnap => {
                const docData = docSnap.data();
                if (docData.installments && docData.installments.current >= currentInstallment) {
                    batch.delete(docSnap.ref);
                }
            });
            await batch.commit();
            toast({ title: "Sucesso!", description: "Despesa e futuras ocorrências foram removidas.", variant: 'destructive' });
        } else {
            const docRef = doc(firestore, "users", userId, "expenses", expenseId);
            await deleteDoc(docRef);
            if (!isRecurring) toast({ title: "Sucesso!", description: "Despesa removida.", variant: 'destructive' });
        }
    } catch (e) {
        const pathForError = `/users/${userId}/expenses/${expenseId}`;
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: pathForError, operation: 'delete' }));
        toast({ title: "Erro!", description: "Ocorreu um erro ao remover a despesa.", variant: 'destructive' });
        throw e;
    }
  };

  const bulkUpdatePaidStatus = async (expenseIds: string[], paid: boolean) => {
    if (!firestore || !userId) return;
    const batch = writeBatch(firestore);
    expenseIds.forEach(id => {
      const docRef = doc(firestore, "users", userId, "expenses", id);
      batch.update(docRef, { paid });
    });
    try {
        await batch.commit();
        toast({ title: "Sucesso!", description: `${expenseIds.length} despesa(s) foram atualizadas.` });
    } catch(e) {
        toast({ title: "Erro!", description: "Ocorreu um erro ao atualizar as despesas.", variant: 'destructive' });
    }
  };

  const bulkDeleteExpenses = async (expenseIds: string[]) => {
    if (!firestore || !userId) return;
    const batch = writeBatch(firestore);
    
    expenseIds.forEach(id => {
        const docRef = doc(firestore, "users", userId, "expenses", id);
        batch.delete(docRef);
    });

    try {
        await batch.commit();
        toast({ title: "Sucesso!", description: `${expenseIds.length} despesa(s) foram removidas.`, variant: 'destructive' });
    } catch (e) {
        toast({ title: "Erro!", description: "Ocorreu um erro ao remover as despesas.", variant: 'destructive' });
    }
  };

  // --- SALARY MUTATOR ---
  const updateSalary = async (newSalary: number) => {
    if (!salaryDocRef) return;
    const data = { amount: newSalary };
    setDoc(salaryDocRef, data, { merge: true }).catch(e => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: salaryDocRef.path, operation: 'update', requestResourceData: data }));
        toast({ title: "Erro!", description: "Não foi possível atualizar o salário.", variant: "destructive" });
    });
  };

  // --- PROFILE MUTATOR ---
  const updateUserProfile = (profileData: Omit<UserProfile, 'id'>) => {
    if (!profileDocRef) return;
    setDoc(profileDocRef, profileData, { merge: true }).catch(e => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({ path: profileDocRef.path, operation: 'update', requestResourceData: profileData }));
      toast({ title: "Erro!", description: "Não foi possível atualizar o perfil.", variant: "destructive" });
    });
  };

  // --- CONTEXT VALUE ---
  const value = useMemo(() => ({
    banks,
    categories,
    paymentMethods,
    expenses,
    salary,
    userProfile,
    loading,
    addBank,
    updateBank,
    deleteBank,
    addCategory,
    updateCategory,
    deleteCategory,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    addExpense,
    updateExpense,
    deleteExpense,
    bulkUpdatePaidStatus,
    bulkDeleteExpenses,
    updateSalary,
    updateUserProfile,
  }), [banks, categories, paymentMethods, expenses, salary, userProfile, loading]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
```

---

### Arquivo: `src/firebase/config.ts`

```ts
export const firebaseConfig = {
  "projectId": "studio-2944346188-cc831",
  "appId": "1:693179364568:web:fd4c4e0160c054d6e653ad",
  "apiKey": "AIzaSyDjTn_IyTLS504PP5J98sb4JpK3ER73I5Q",
  "authDomain": "studio-2944346188-cc831.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "693179364568"
};
```

---

### Arquivo: `src/firebase/error-emitter.ts`

```ts
'use client';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * Defines the shape of all possible events and their corresponding payload types.
 * This centralizes event definitions for type safety across the application.
 */
export interface AppEvents {
  'permission-error': FirestorePermissionError;
}

// A generic type for a callback function.
type Callback<T> = (data: T) => void;

/**
 * A strongly-typed pub/sub event emitter.
 * It uses a generic type T that extends a record of event names to payload types.
 */
function createEventEmitter<T extends Record<string, any>>() {
  // The events object stores arrays of callbacks, keyed by event name.
  // The types ensure that a callback for a specific event matches its payload type.
  const events: { [K in keyof T]?: Array<Callback<T[K]>> } = {};

  return {
    /**
     * Subscribe to an event.
     * @param eventName The name of the event to subscribe to.
     * @param callback The function to call when the event is emitted.
     */
    on<K extends keyof T>(eventName: K, callback: Callback<T[K]>) {
      if (!events[eventName]) {
        events[eventName] = [];
      }
      events[eventName]?.push(callback);
    },

    /**
     * Unsubscribe from an event.
     * @param eventName The name of the event to unsubscribe from.
     * @param callback The specific callback to remove.
     */
    off<K extends keyof T>(eventName: K, callback: Callback<T[K]>) {
      if (!events[eventName]) {
        return;
      }
      events[eventName] = events[eventName]?.filter(cb => cb !== callback);
    },

    /**
     * Publish an event to all subscribers.
     * @param eventName The name of the event to emit.
     * @param data The data payload that corresponds to the event's type.
     */
    emit<K extends keyof T>(eventName: K, data: T[K]) {
      if (!events[eventName]) {
        return;
      }
      events[eventName]?.forEach(callback => callback(data));
    },
  };
}

// Create and export a singleton instance of the emitter, typed with our AppEvents interface.
export const errorEmitter = createEventEmitter<AppEvents>();
```

---

### Arquivo: `src/firebase/errors.ts`

```ts
'use client';
import { getAuth, type User } from 'firebase/auth';

type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
  requestResourceData?: any;
};

interface FirebaseAuthToken {
  name: string | null;
  email: string | null;
  email_verified: boolean;
  phone_number: string | null;
  sub: string;
  firebase: {
    identities: Record<string, string[]>;
    sign_in_provider: string;
    tenant: string | null;
  };
}

interface FirebaseAuthObject {
  uid: string;
  token: FirebaseAuthToken;
}

interface SecurityRuleRequest {
  auth: FirebaseAuthObject | null;
  method: string;
  path: string;
  resource?: {
    data: any;
  };
}

/**
 * Builds a security-rule-compliant auth object from the Firebase User.
 * @param currentUser The currently authenticated Firebase user.
 * @returns An object that mirrors request.auth in security rules, or null.
 */
function buildAuthObject(currentUser: User | null): FirebaseAuthObject | null {
  if (!currentUser) {
    return null;
  }

  const token: FirebaseAuthToken = {
    name: currentUser.displayName,
    email: currentUser.email,
    email_verified: currentUser.emailVerified,
    phone_number: currentUser.phoneNumber,
    sub: currentUser.uid,
    firebase: {
      identities: currentUser.providerData.reduce((acc, p) => {
        if (p.providerId) {
          acc[p.providerId] = [p.uid];
        }
        return acc;
      }, {} as Record<string, string[]>),
      sign_in_provider: currentUser.providerData[0]?.providerId || 'custom',
      tenant: currentUser.tenantId,
    },
  };

  return {
    uid: currentUser.uid,
    token: token,
  };
}

/**
 * Builds the complete, simulated request object for the error message.
 * It safely tries to get the current authenticated user.
 * @param context The context of the failed Firestore operation.
 * @returns A structured request object.
 */
function buildRequestObject(context: SecurityRuleContext): SecurityRuleRequest {
  let authObject: FirebaseAuthObject | null = null;
  try {
    // Safely attempt to get the current user.
    const firebaseAuth = getAuth();
    const currentUser = firebaseAuth.currentUser;
    if (currentUser) {
      authObject = buildAuthObject(currentUser);
    }
  } catch {
    // This will catch errors if the Firebase app is not yet initialized.
    // In this case, we'll proceed without auth information.
  }

  return {
    auth: authObject,
    method: context.operation,
    path: `/databases/(default)/documents/${context.path}`,
    resource: context.requestResourceData ? { data: context.requestResourceData } : undefined,
  };
}

/**
 * Builds the final, formatted error message for the LLM.
 * @param requestObject The simulated request object.
 * @returns A string containing the error message and the JSON payload.
 */
function buildErrorMessage(requestObject: SecurityRuleRequest): string {
  return `Missing or insufficient permissions: The following request was denied by Firestore Security Rules:
${JSON.stringify(requestObject, null, 2)}`;
}

/**
 * A custom error class designed to be consumed by an LLM for debugging.
 * It structures the error information to mimic the request object
 * available in Firestore Security Rules.
 */
export class FirestorePermissionError extends Error {
  public readonly request: SecurityRuleRequest;

  constructor(context: SecurityRuleContext) {
    const requestObject = buildRequestObject(context);
    super(buildErrorMessage(requestObject));
    this.name = 'FirebaseError';
    this.request = requestObject;
  }
}
```

---

### Arquivo: `src/firebase/firestore/use-collection.ts`

```ts
'use client';

import { useState, useEffect } from 'react';
import {
  Query,
  onSnapshot,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  CollectionReference,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/** Utility type to add an 'id' field to a given type T. */
export type WithId<T> = T & { id: string };

/**
 * Interface for the return value of the useCollection hook.
 * @template T Type of the document data.
 */
export interface UseCollectionResult<T> {
  data: WithId<T>[] | null; // Document data with ID, or null.
  isLoading: boolean;       // True if loading.
  error: FirestoreError | Error | null; // Error object, or null.
}

/* Internal implementation of Query:
  https://github.com/firebase/firebase-js-sdk/blob/c5f08a9bc5da0d2b0207802c972d53724ccef055/packages/firestore/src/lite-api/reference.ts#L143
*/
export interface InternalQuery extends Query<DocumentData> {
  _query: {
    path: {
      canonicalString(): string;
      toString(): string;
    }
  }
}

/**
 * React hook to subscribe to a Firestore collection or query in real-time.
 * Handles nullable references/queries.
 * 
 *
 * IMPORTANT! YOU MUST MEMOIZE the inputted memoizedTargetRefOrQuery or BAD THINGS WILL HAPPEN
 * use useMemo to memoize it per React guidence.  Also make sure that it's dependencies are stable
 * references
 *  
 * @template T Optional type for document data. Defaults to any.
 * @param {CollectionReference<DocumentData> | Query<DocumentData> | null | undefined} targetRefOrQuery -
 * The Firestore CollectionReference or Query. Waits if null/undefined.
 * @returns {UseCollectionResult<T>} Object with data, isLoading, error.
 */
export function useCollection<T = any>(
    memoizedTargetRefOrQuery: ((CollectionReference<DocumentData> | Query<DocumentData>) & {__memo?: boolean})  | null | undefined,
): UseCollectionResult<T> {
  type ResultItemType = WithId<T>;
  type StateDataType = ResultItemType[] | null;

  const [data, setData] = useState<StateDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | Error | null>(null);

  useEffect(() => {
    if (!memoizedTargetRefOrQuery) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Directly use memoizedTargetRefOrQuery as it's assumed to be the final query
    const unsubscribe = onSnapshot(
      memoizedTargetRefOrQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const results: ResultItemType[] = [];
        for (const doc of snapshot.docs) {
          results.push({ ...(doc.data() as T), id: doc.id });
        }
        setData(results);
        setError(null);
        setIsLoading(false);
      },
      (error: FirestoreError) => {
        // This logic extracts the path from either a ref or a query
        const path: string =
          memoizedTargetRefOrQuery.type === 'collection'
            ? (memoizedTargetRefOrQuery as CollectionReference).path
            : (memoizedTargetRefOrQuery as unknown as InternalQuery)._query.path.canonicalString()

        const contextualError = new FirestorePermissionError({
          operation: 'list',
          path,
        })

        setError(contextualError)
        setData(null)
        setIsLoading(false)

        // trigger global error propagation
        errorEmitter.emit('permission-error', contextualError);
      }
    );

    return () => unsubscribe();
  }, [memoizedTargetRefOrQuery]); // Re-run if the target query/reference changes.
  if(memoizedTargetRefOrQuery && !memoizedTargetRefOrQuery.__memo) {
    throw new Error(memoizedTargetRefOrQuery + ' was not properly memoized using useMemoFirebase');
  }
  return { data, isLoading, error };
}
```

---

### Arquivo: `src/firebase/firestore/use-doc.ts`

```ts
'use client';
    
import { useState, useEffect } from 'react';
import {
  DocumentReference,
  onSnapshot,
  DocumentData,
  FirestoreError,
  DocumentSnapshot,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/** Utility type to add an 'id' field to a given type T. */
type WithId<T> = T & { id: string };

/**
 * Interface for the return value of the useDoc hook.
 * @template T Type of the document data.
 */
export interface UseDocResult<T> {
  data: WithId<T> | null; // Document data with ID, or null.
  isLoading: boolean;       // True if loading.
  error: FirestoreError | Error | null; // Error object, or null.
}

/**
 * React hook to subscribe to a single Firestore document in real-time.
 * Handles nullable references.
 * 
 * IMPORTANT! YOU MUST MEMOIZE the inputted memoizedTargetRefOrQuery or BAD THINGS WILL HAPPEN
 * use useMemo to memoize it per React guidence.  Also make sure that it's dependencies are stable
 * references
 *
 *
 * @template T Optional type for document data. Defaults to any.
 * @param {DocumentReference<DocumentData> | null | undefined} docRef -
 * The Firestore DocumentReference. Waits if null/undefined.
 * @returns {UseDocResult<T>} Object with data, isLoading, error.
 */
export function useDoc<T = any>(
  memoizedDocRef: DocumentReference<DocumentData> | null | undefined,
): UseDocResult<T> {
  type StateDataType = WithId<T> | null;

  const [data, setData] = useState<StateDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | Error | null>(null);

  useEffect(() => {
    if (!memoizedDocRef) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    // Optional: setData(null); // Clear previous data instantly

    const unsubscribe = onSnapshot(
      memoizedDocRef,
      (snapshot: DocumentSnapshot<DocumentData>) => {
        if (snapshot.exists()) {
          setData({ ...(snapshot.data() as T), id: snapshot.id });
        } else {
          // Document does not exist
          setData(null);
        }
        setError(null); // Clear any previous error on successful snapshot (even if doc doesn't exist)
        setIsLoading(false);
      },
      (error: FirestoreError) => {
        const contextualError = new FirestorePermissionError({
          operation: 'get',
          path: memoizedDocRef.path,
        })

        setError(contextualError)
        setData(null)
        setIsLoading(false)

        // trigger global error propagation
        errorEmitter.emit('permission-error', contextualError);
      }
    );

    return () => unsubscribe();
  }, [memoizedDocRef]); // Re-run if the memoizedDocRef changes.

  return { data, isLoading, error };
}
```

---

### Arquivo: `src/firebase/index.ts`

```ts
'use client';

export * from './provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
// use-user is now exported from provider
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
```

---

### Arquivo: `src/firebase/non-blocking-login.tsx`

```tsx
'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // Assume getAuth and app are initialized elsewhere
} from 'firebase/auth';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  // CRITICAL: Call signInAnonymously directly. Do NOT use 'await signInAnonymously(...)'.
  signInAnonymously(authInstance);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call createUserWithEmailAndPassword directly. Do NOT use 'await createUserWithEmailAndPassword(...)'.
  createUserWithEmailAndPassword(authInstance, email, password);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call signInWithEmailAndPassword directly. Do NOT use 'await signInWithEmailAndPassword(...)'.
  signInWithEmailAndPassword(authInstance, email, password);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}
```

---

### Arquivo: `src/firebase/non-blocking-updates.tsx`

```tsx
'use client';
    
import {
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  DocumentReference,
  SetOptions,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import {FirestorePermissionError} from '@/firebase/errors';

/**
 * Initiates a setDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function setDocumentNonBlocking(docRef: DocumentReference, data: any, options: SetOptions) {
  setDoc(docRef, data, options).catch(error => {
    errorEmitter.emit(
      'permission-error',
      new FirestorePermissionError({
        path: docRef.path,
        operation: 'write', // or 'create'/'update' based on options
        requestResourceData: data,
      })
    )
  })
  // Execution continues immediately
}


/**
 * Initiates an addDoc operation for a collection reference.
 * Does NOT await the write operation internally.
 * Returns the Promise for the new doc ref, but typically not awaited by caller.
 */
export function addDocumentNonBlocking(colRef: CollectionReference, data: any) {
  const promise = addDoc(colRef, data)
    .catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: colRef.path,
          operation: 'create',
          requestResourceData: data,
        })
      )
    });
  return promise;
}


/**
 * Initiates an updateDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function updateDocumentNonBlocking(docRef: DocumentReference, data: any) {
  updateDoc(docRef, data)
    .catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: data,
        })
      )
    });
}


/**
 * Initiates a deleteDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function deleteDocumentNonBlocking(docRef: DocumentReference) {
  deleteDoc(docRef)
    .catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: docRef.path,
          operation: 'delete',
        })
      )
    });
}
```

---

### Arquivo: `src/firebase/provider.tsx`

```tsx
'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect, DependencyList } from 'react';
import { FirebaseApp, getApps, initializeApp, getApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged, getAuth } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { firebaseConfig } from './config';

// Interface para os serviços Firebase e estado do usuário
interface FirebaseContextValue {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  user: User | null;
  loading: boolean;
  error: Error | null;
}

// Criação do Context
const FirebaseContext = createContext<FirebaseContextValue | undefined>(undefined);

// Função de inicialização única
let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

const initializeFirebaseServices = () => {
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApp();
  }
  auth = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);
  return { firebaseApp, auth, firestore };
};


// Provedor Principal
interface FirebaseProviderProps {
  children: ReactNode;
}

export function FirebaseProvider({ children }: FirebaseProviderProps) {
  // Inicializa os serviços uma vez
  const services = useMemo(() => initializeFirebaseServices(), []);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      services.auth,
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error('Auth state change error', error);
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [services.auth]);

  const value = useMemo(() => ({
    ...services,
    user,
    loading,
    error,
  }), [services, user, loading, error]);

  return (
    <FirebaseContext.Provider value={value}>
        <FirebaseErrorListener />
        {children}
    </FirebaseContext.Provider>
  );
}

// Hook para acessar todo o contexto
export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}

// Hooks específicos para cada serviço/dado
export const useAuth = (): Auth => {
  const { auth } = useFirebase();
  return auth;
};

export const useFirestore = (): Firestore => {
    const { firestore } = useFirebase();
    return firestore;
};

export const useFirebaseApp = (): FirebaseApp => {
    const { firebaseApp } = useFirebase();
    return firebaseApp;
};

export const useUser = () => {
    const { user, loading, error } = useFirebase();
    return { user, loading, error };
}

// Hook de memoização estável
export function useMemoFirebase<T>(factory: () => T, deps: DependencyList): T {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoizedValue = useMemo(factory, deps);
    
    // Adiciona uma propriedade para verificação, útil para debug
    if (memoizedValue && typeof memoizedValue === 'object') {
      (memoizedValue as any).__memo = true;
    }

    return memoizedValue;
}
```

---

### Arquivo: `src/hooks/use-toast.ts`

```ts
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 800

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      duration: 800,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
```

---

### Arquivo: `src/lib/constants.ts`

```ts
import {
  Car,
  UtensilsCrossed,
  Home,
  HeartPulse,
  Film,
  GraduationCap,
  Shirt,
  MoreHorizontal,
  CreditCard,
  Landmark,
  Wallet,
  Smartphone,
  Barcode,
  HelpCircle, // Default icon
  type LucideIcon,
} from "lucide-react";

// This is now a mapping of keywords to icons for dynamic matching.
// The key should be a lowercase, normalized version of the category name.
export const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  alimentacao: UtensilsCrossed,
  comida: UtensilsCrossed,
  restaurante: UtensilsCrossed,
  moradia: Home,
  casa: Home,
  aluguel: Home,
  transporte: Car,
  carro: Car,
  uber: Car,
  saude: HeartPulse,
  medico: HeartPulse,
  farmacia: HeartPulse,
  lazer: Film,
  entretenimento: Film,
  educacao: GraduationCap,
  estudo: GraduationCap,
  vestuario: Shirt,
  roupas: Shirt,
  cartao: CreditCard,
  outros: MoreHorizontal,
};

// This is now a mapping of keywords to icons for dynamic matching.
const PAYMENT_METHOD_ICON_MAP: Record<string, LucideIcon> = {
  credito: CreditCard,
  debito: Landmark,
  dinheiro: Wallet,
  pix: Smartphone,
  boleto: Barcode,
};

const normalizeString = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const getCategoryIcon = (categoryName: string): LucideIcon => {
    const normalizedName = normalizeString(categoryName);
    const keywords = Object.keys(CATEGORY_ICON_MAP);
    const foundKeyword = keywords.find(keyword => normalizedName.includes(keyword));
    return foundKeyword ? CATEGORY_ICON_MAP[foundKeyword] : HelpCircle;
};

export const getPaymentMethodIcon = (methodName: string): LucideIcon => {
    const normalizedName = normalizeString(methodName);
    const keywords = Object.keys(PAYMENT_METHOD_ICON_MAP);
    const foundKeyword = keywords.find(keyword => normalizedName.includes(keyword));
    return foundKeyword ? PAYMENT_METHOD_ICON_MAP[foundKeyword] : CreditCard;
};
```

---

### Arquivo: `src/lib/placeholder-images.json`

```json
{
  "placeholderImages": []
}
```

---

### Arquivo: `src/lib/placeholder-images.ts`

```ts
import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
```

---

### Arquivo: `src/lib/types.ts`

```ts
export interface Bank {
  id: string;
  name: string;
}

// These types are now for custom user-defined items
export interface Category {
  id: string;
  name: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string; // YYYY-MM-DD
  category: string; // Now a string to match the name of the custom category
  paymentMethod: string; // Now a string to match the name of the custom payment method
  bank?: string;
  installments: {
    total: number;
    current: number;
    parentId: string;
  } | null;
  paid: boolean;
  isRecurring: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  birthDate: string; // YYYY-MM-DD
  workplace?: string;
  position?: string;
  role?: string;
}
```

---

### Arquivo: `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}
```

---

### Arquivo: `tailwind.config.ts`

```ts
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['PT Sans', 'sans-serif'],
        headline: ['PT Sans', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
```

---

### Arquivo: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

