type TextInput = {
  name: string;
  tagName: "input";
  type: "text" | "email" | "tel";
  label: string;
  placeholder: string;
}

type RadioInput = {
  name: string;
  label: string;
  tagName: "input";
  type: "radio";
  values: {
    label: string;
    value: number;
  }[]
}

type CheckboxInput = {
  name: string;
  label: string;
  tagName: "input";
  type: "checkbox";
  values: {
    label: string;
    value: number;
  }[]
}

type SelectInput = {
  name: string;
  label: string;
  tagName: "select";
  options: {
    text: string;
    value: number;
  }[]
}

type TextAreaInput = {
  name: string;
  placeholder: string;
  label: string;
  tagName: "textarea";
}

type Item = TextInput | RadioInput | CheckboxInput | SelectInput | TextAreaInput

const items: Item[] = [
  {
    name: "name",
    label: "お名前",
    tagName: "input",
    type: "text",
    placeholder: "例）山田　太郎",
  },
  {
    name: "email",
    label: "メールアドレス",
    tagName: "input",
    type: "email",
    placeholder: `例）example@gmail.com`,
  },
  {
    name: "tel",
    label: "電話番号",
    tagName: "input",
    type: "tel",
    placeholder: "例）080-1234-5678",
  },
  {
    name: "address",
    label: "ご住所",
    tagName: "input",
    type: "text",
    placeholder: "例）東京都千代田区丸の内1丁目9-2",
  },
  {
    name: "contact",
    label: "ご希望の返信方法",
    tagName: "input",
    type: "radio",
    values: [
      { label: "メール", value: 0 },
      { label: "電話", value: 1 },
      { label: "どちらでも可", value: 2 },
    ],
  },
  {
    name: "time",
    label: "連絡可能な時間帯（電話）",
    tagName: "input",
    type: "checkbox",
    values: [
      { label: "09:00〜12:00", value: 0 },
      { label: "13:00〜16:00", value: 1 },
      { label: "16:00〜19:00", value: 2 },
    ],
  },
  {
    name: "inquiry_kind",
    label: "お問い合せの種類",
    tagName: "select",
    options: [
      { text: "返品について", value: 0 },
      { text: "発送について", value: 1 },
      { text: "その他", value: 2 },
    ],
  },
  {
    name: "inquiry_detail",
    label: "お問い合せ内容",
    tagName: "textarea",
    placeholder: "例）お問い合わせ内容詳細をご記入ください",
  },
];

// _____________________________________________________________________________
//

function createInputRow(item: TextInput) {
  return `
    <tr>
      <th>
        <label for="${item.name}">${item.label}</label>
      </th>
      <td>
        <input id="${item.name}" name="${item.name}" type="${item.type}" placeholder="${item.placeholder}"/>
      </td>
    </tr>
  `;
}

function createMultipleInputsRow(item: RadioInput | CheckboxInput) {
  return `
    <tr>
      <th>
        <label for="${item.name}">${item.label}</label>
      </th>
      <td>
        ${
          item.values
          .map((value, index) => 
            `<input id="${item.name + index}" name="${item.name}" type="${item.type}" ><label for="${item.name + index}">${value.label}</label>`)
          .join('')
        }
      </td>
    </tr>
  `;
}

function createSelectRow(item: SelectInput) {
  return `
    <tr>
      <th>
        <label for="${item.name}">${item.label}</label>
      </th>
      <td>
        <select id="${item.name}" name="${item.name}">
          ${item.options?.map(option => `
            <option value="${option.value}">${option.text}</option>
          `).join('')}
        </select>
      </td>
    </tr>
  `;
}

function createTextAreaRow(item: TextAreaInput) {
  return `
    <tr>
      <th>
        <label for="${item.name}">${item.label}</label>
      </th>
      <td>
        <textarea id="${item.name}" name="${item.name}" placeholder="${item.placeholder}"></textarea>
      </td>
    </tr>
  `;
}

function createTable() {
  const list = items
    .map((item) => {
      switch (item.tagName) {
        case "input": {
          switch(item.type) {
            case "radio":
            case "checkbox":
              return createMultipleInputsRow(item);
            default:
              return createInputRow(item)
          }
        }
        case "select":
          return createSelectRow(item);
        case "textarea":
          return createTextAreaRow(item);
      }
    })
    .join("");
  return `<table>${list}</table>`;
}

function createFormDom() {
  const form = document.getElementById("form");
  if (form !== null) {
    form.innerHTML = createTable();
  }
}

createFormDom();
