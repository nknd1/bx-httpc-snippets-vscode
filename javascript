{
  "HttpClient: import": {
    "prefix": "httpc-import",
    "body": [
      "import { HttpClient } from 'main.core';"
    ],
    "description": "Импорт HttpClient из ядра"
  },

  "HttpClient: import + все классы ошибок": {
    "prefix": "httpc-import-all",
    "body": [
      "import {",
      "\tHttpClient,",
      "\tHttpClientError,",
      "\tControllerError,",
      "\tNetworkError,",
      "\tTimeoutError,",
      "\tHttpError,",
      "\tParseError,",
      "} from 'main.core';"
    ],
    "description": "Импорт HttpClient и классов ошибок"
  },

  "HttpClient: action (резолвит data)": {
    "prefix": "httpc-action",
    "body": [
      "const ${1:data} = await HttpClient.action('${2:controller.action}', {",
      "\tdata: { ${3} },",
      "});",
      "$0"
    ],
    "description": "Вызов action контроллера, возвращает data"
  },

  "HttpClient: actionRaw (весь конверт)": {
    "prefix": "httpc-action-raw",
    "body": [
      "const ${1:envelope} = await HttpClient.actionRaw('${2:controller.action}', {",
      "\tdata: { ${3} },",
      "});"
    ],
    "description": "Вызов actionRaw, возвращает {status, data, errors}"
  },

  "HttpClient: action GET + query": {
    "prefix": "httpc-action-get",
    "body": [
      "const ${1:data} = await HttpClient.action('${2:controller.action}', {",
      "\tmethod: 'GET',",
      "\tquery: { ${3} },",
      "});"
    ],
    "description": "Action без тела — данные через query"
  },

  "HttpClient: action + navigation": {
    "prefix": "httpc-action-nav",
    "body": [
      "const ${1:data} = await HttpClient.action('${2:controller.action}', {",
      "\tnavigation: { page: ${3:1}, size: ${4:20} },",
      "\t${5:data: {},}",
      "});"
    ]
  },

  "HttpClient: action + analytics": {
    "prefix": "httpc-action-analytics",
    "body": [
      "const ${1:data} = await HttpClient.action('${2:controller.action}', {",
      "\t${3:data: {},}",
      "\tanalytics: {",
      "\t\tevent: '${4:event}',",
      "\t\ttool: '${5:tool}',",
      "\t\tcategory: '${6:category}',",
      "\t},",
      "});"
    ]
  },

  "HttpClient: action + retry (только для безопасных)": {
    "prefix": "httpc-action-retry",
    "body": [
      "const ${1:data} = await HttpClient.action('${2:controller.action}', {",
      "\t${3:data: {},}",
      "\tretry: { retries: ${4:2}, idempotent: true },",
      "});"
    ],
    "description": "idempotent: true — только если действие безопасно повторять (чтение)"
  },

  "HttpClient: action + crossTabLockKey": {
    "prefix": "httpc-action-crosstab",
    "body": [
      "const ${1:data} = await HttpClient.action('${2:controller.action}', {",
      "\t${3:data: {},}",
      "\tcrossTabLockKey: '${4:module.action}',",
      "\tcrossTabLockTimeout: ${5:5000},",
      "});"
    ]
  },

  "HttpClient: action + timeout": {
    "prefix": "httpc-action-timeout",
    "body": [
      "await HttpClient.action('${1:controller.action}', {",
      "\t${2:data: {},}",
      "\ttimeout: ${3:3000},",
      "});"
    ]
  },

  "HttpClient: action + AbortController": {
    "prefix": "httpc-action-abort",
    "body": [
      "const ${1:controller} = new AbortController();",
      "const ${2:promise} = HttpClient.action('${3:controller.action}', {",
      "\t${4:data: {},}",
      "\tsignal: $1.signal,",
      "});",
      "// $1.abort();"
    ]
  },

  "HttpClient: action + FormData": {
    "prefix": "httpc-formdata",
    "body": [
      "const ${1:form} = new FormData();",
      "$1.append('${2:field}', ${3:value});",
      "const ${4:data} = await HttpClient.action('${5:controller.action}', {",
      "\tdata: $1,",
      "});"
    ]
  },

  "HttpClient: try/catch ControllerError": {
    "prefix": "httpc-try",
    "body": [
      "try {",
      "\tconst ${1:data} = await HttpClient.action('${2:controller.action}', {",
      "\t\t${3:data: {},}",
      "\t});",
      "\t$0",
      "} catch (error) {",
      "\tif (error instanceof HttpClient.ControllerError) {",
      "\t\tconsole.error(error.errors);",
      "\t\treturn;",
      "\t}",
      "\tthrow error;",
      "}"
    ],
    "description": "Без дополнительных импортов — ошибки через HttpClient.*"
  },

  "HttpClient: полная обработка ошибок": {
    "prefix": "httpc-try-full",
    "body": [
      "try {",
      "\tconst ${1:data} = await HttpClient.action('${2:controller.action}', {",
      "\t\t${3:data: {},}",
      "\t});",
      "\t$0",
      "} catch (error) {",
      "\tif (error instanceof DOMException && error.name === 'AbortError') {",
      "\t\treturn;",
      "\t}",
      "\tif (error instanceof HttpClient.ControllerError) {",
      "\t\tconsole.error(error.errors);",
      "\t} else if (error instanceof HttpClient.NetworkError) {",
      "\t\tconsole.error('network', error);",
      "\t} else if (error instanceof HttpClient.HttpClientError) {",
      "\t\tconsole.error('http-client', error.retryCount, error);",
      "\t} else {",
      "\t\tthrow error;",
      "\t}",
      "}"
    ]
  },

  "HttpClient: новый инстанс (кратко)": {
    "prefix": "httpc-instance",
    "body": [
      "const ${1:client} = new HttpClient({",
      "\tbaseUrl: '${2:/some/api/}',",
      "\ttimeout: ${3:5000},",
      "});"
    ]
  },

  "HttpClient: новый инстанс (все поля)": {
    "prefix": "httpc-instance-full",
    "body": [
      "const ${1:client} = new HttpClient({",
      "\tbaseUrl: '${2:/some/api/}',",
      "\tcontrollerEndpoint: '${3:/bitrix/services/main/ajax.php}',",
      "\ttimeout: ${4:5000},",
      "\theaders: { '${5:X-Custom}': '${6:value}' },",
      "\tquery: { ${7} },",
      "\tretry: { retries: ${8:0} },",
      "});"
    ]
  },

  "HttpClient: client.action": {
    "prefix": "httpc-client-action",
    "body": [
      "const ${1:data} = await ${2:client}.action('${3:controller.action}', {",
      "\t${4:data: {},}",
      "});"
    ]
  },

  "HttpClient: сырой GET": {
    "prefix": "httpc-get",
    "body": [
      "const { data, status, headers } = await ${1:client}.get('${2:items}', {",
      "\tquery: { ${3} },",
      "});"
    ]
  },

  "HttpClient: сырой POST": {
    "prefix": "httpc-post",
    "body": [
      "await ${1:client}.post('${2:items}', { ${3} });"
    ]
  },

  "HttpClient: request с responseType": {
    "prefix": "httpc-request",
    "body": [
      "const { data } = await ${1:client}.request({",
      "\turl: '${2:/path}',",
      "\tmethod: '${3:GET}',",
      "\tresponseType: '${4:json}',",
      "});"
    ]
  },

  "HttpClient: blob": {
    "prefix": "httpc-blob",
    "body": [
      "const { data: ${1:blob} } = await ${2:client}.get('${3:/path/to/file}', {",
      "\tresponseType: 'blob',",
      "});"
    ]
  },

  "HttpClient: request interceptor": {
    "prefix": "httpc-interceptor-request",
    "body": [
      "const ${1:id} = ${2:client}.interceptors.request.use((config) => {",
      "\tconst headers = new Headers(config.headers);",
      "\theaders.set('${3:X-Trace-Id}', ${4:crypto.randomUUID()});",
      "\treturn { ...config, headers };",
      "});"
    ]
  },

  "HttpClient: response interceptor": {
    "prefix": "httpc-interceptor-response",
    "body": [
      "${1:client}.interceptors.response.use(",
      "\t(response) => response,",
      "\t(error) => {",
      "\t\tconsole.error(error);",
      "\t\tthrow error;",
      "\t},",
      ");"
    ]
  },

  "HttpClient: eject interceptor": {
    "prefix": "httpc-eject",
    "body": [
      "${1:client}.interceptors.request.eject(${2:id});"
    ]
  },

  "HttpClient: Component / HtmlContent": {
    "prefix": "httpc-component",
    "body": [
      "const { html } = await HttpClient.action('${1:component.controller.action}', {",
      "\tdata: { ${2} },",
      "});",
      "BX.Runtime.html(${3:node}, html);"
    ]
  },

  "HttpClient: BX.HttpClient.action": {
    "prefix": "httpc-bx-action",
    "body": [
      "const { data } = await BX.HttpClient.action('${1:controller.action}', {",
      "\tdata: { ${2} },",
      "});"
    ]
  },

  "HttpClient: BX.HttpClient.action + try/catch": {
    "prefix": "httpc-bx-try",
    "body": [
      "try {",
      "\tconst ${1:data} = await BX.HttpClient.action('${2:controller.action}', {",
      "\t\t${3:data: {},}",
      "\t});",
      "\t$0",
      "} catch (error) {",
      "\tif (error instanceof BX.HttpClient.ControllerError) {",
      "\t\tconsole.error(error.errors);",
      "\t\treturn;",
      "\t}",
      "\tthrow error;",
      "}"
    ]
  }
}
