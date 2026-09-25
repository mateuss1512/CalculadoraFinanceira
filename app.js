const formats = {
  money: (v) => `R$ ${Number(v).toFixed(2)}`,
  num6: (v) => Number(v).toFixed(6),
  pct: (v) => `${(Number(v) * 100).toFixed(2)}%`,
};

const periods = [
  { value: "daily", label: "a.d. (ao dia)", days: 1 },
  { value: "weekly", label: "a.sem. (semanal)", days: 7 },
  { value: "monthly", label: "a.m. (ao mês)", days: 30 },
  { value: "bimonthly", label: "a.b. (ao bimestre)", days: 60 },
  { value: "quarterly", label: "a.t. (ao trimestre)", days: 90 },
  { value: "quadrimestral", label: "a.q. (ao quadrimestre)", days: 120 },
  { value: "semiannual", label: "a.s. (ao semestre)", days: 180 },
  { value: "yearly", label: "a.a. (ao ano)", days: 360 },
];

const defs = {
  js: {
    select: "js-op",
    fieldsWrap: "js-fields",
    result: "js-result",
    ops: {
      vp: { label: "Calcular Capital (VP)", inputs: ["VF", "i", "n"] },
      vf: { label: "Calcular Montante (VF)", inputs: ["VP", "i", "n"] },
      j: { label: "Calcular Juros (J)", inputs: ["VP", "i", "n"] },
      i: { label: "Calcular Taxa (i)", inputs: ["VP", "VF", "n"] },
      n: { label: "Calcular Tempo (n)", inputs: ["VP", "VF", "i"] },
    },
  },
  jc: {
    select: "jc-op",
    fieldsWrap: "jc-fields",
    result: "jc-result",
    ops: {
      vp: { label: "Calcular Capital (VP)", inputs: ["VF", "i", "n"] },
      vf: { label: "Calcular Montante (VF)", inputs: ["VP", "i", "n"] },
      j: { label: "Calcular Juros (J)", inputs: ["VP", "i", "n"] },
      i: { label: "Calcular Taxa (i)", inputs: ["VP", "VF", "n"] },
      n: { label: "Calcular Tempo (n)", inputs: ["VP", "VF", "i"] },
    },
  },
  dcc: {
    select: "dcc-op",
    fieldsWrap: "dcc-fields",
    result: "dcc-result",
    ops: {
      a: { label: "Calcular Valor Atual (A)", inputs: ["N", "i", "n"] },
      n: { label: "Calcular Valor Nominal (N)", inputs: ["A", "i", "n"] },
      dc: { label: "Calcular Desconto Comercial (Dc)", inputs: ["N", "i", "n"] },
      i: { label: "Calcular Taxa (i)", inputs: ["N", "A", "n"] },
      t: { label: "Calcular Tempo (n)", inputs: ["N", "A", "i"] },
    },
  },
  drc: {
    select: "drc-op",
    fieldsWrap: "drc-fields",
    result: "drc-result",
    ops: {
      a: { label: "Calcular Valor Atual (A)", inputs: ["N", "i", "n"] },
      n: { label: "Calcular Valor Nominal (N)", inputs: ["A", "i", "n"] },
      dr: { label: "Calcular Desconto Racional (Dr)", inputs: ["N", "i", "n"] },
      i: { label: "Calcular Taxa (i)", inputs: ["N", "A", "n"] },
      t: { label: "Calcular Tempo (n)", inputs: ["N", "A", "i"] },
    },
  },
  sac: {
    select: "sac-op",
    fieldsWrap: "sac-fields",
    result: "sac-result",
    ops: {
      pmt: { label: "Calcular PMT", inputs: ["VP", "n", "i", "t"] },
      amort: { label: "Calcular Amortizacao", inputs: ["VP", "n"] },
      j: { label: "Calcular Juros", inputs: ["VP", "n", "i", "t"] },
      sd: { label: "Calcular Saldo Devedor", inputs: ["VP", "n", "t"] },
    },
  },
  te: {
    select: "te-op",
    fieldsWrap: "te-fields",
    result: "te-result",
    ops: {
      eq_comp: { label: "Equivalência de Taxa Composta Geral", inputs: ["ic"] },
      mm: { label: "Maior para Menor (Composta)", inputs: ["n", "ic"] },
      mM: { label: "Menor para Maior (Composta)", inputs: ["n", "ic"] },
      ef: { label: "Taxa Efetiva Composta (i = ik/k)", inputs: ["ik", "k"] },
      js_ef: { label: "Taxa Efetiva Simples (Juros Simples)", inputs: ["ic", "n"] },
      js_dc: { label: "Taxa de Desconto Simples (Juros Simples)", inputs: ["i", "n"] },
    },
  },
  tec: {
    select: "tec-op",
    fieldsWrap: "tec-fields",
    result: "tec-result",
    ops: {
      js_ef: { label: "Desconto Comercial -> Taxa Efetiva (Simples)", inputs: ["ic", "n"] },
      js_dc: { label: "Taxa Efetiva -> Desconto Comercial (Simples)", inputs: ["i", "n"] },
      jc_ef: { label: "Taxa Nominal -> Taxa Efetiva (Composta)", inputs: ["ik", "k"] },
    },
  },
};

const inputLabels = {
  VP: "Valor Presente (VP)",
  VF: "Valor Futuro (VF)",
  J: "Juros (J)",
  N: "Valor Nominal (N)",
  A: "Valor Atual (A)",
  Dc: "Desconto Comercial (Dc)",
  Dr: "Desconto Racional (Dr)",
  i: "Taxa (i %)",
  n: "Tempo (n)",
  t: "Numero da prestacao (t)",
  ic: "Taxa conhecida (ic %)",
  ik: "Taxa nominal (ik %)",
  k: "Periodo (k)",
};

function buildDynamicCalculator(key) {
  const cfg = defs[key];
  const select = document.getElementById(cfg.select);
  const fieldsWrap = document.getElementById(cfg.fieldsWrap);

  Object.entries(cfg.ops).forEach(([opValue, opCfg]) => {
    const option = document.createElement("option");
    option.value = opValue;
    option.textContent = opCfg.label;
    select.appendChild(option);
  });

  const renderFields = () => {
    const opCfg = cfg.ops[select.value];
    fieldsWrap.innerHTML = "";

    opCfg.inputs.forEach((name) => {
      const fieldGroup = document.createElement("div");
      fieldGroup.className = "field-group";

      const label = document.createElement("label");
      label.textContent = inputLabels[name] || name;
      fieldGroup.appendChild(label);

      const inputWrap = document.createElement("div");
      inputWrap.className = "input-wrap";

      const input = document.createElement("input");
      input.type = "number";
      input.step = "any";
      input.dataset.name = name;
      inputWrap.appendChild(input);

      // Se for taxa ou tempo (e não for SAC), adiciona seletor de período
      if (key !== "sac" && (name === "i" || name === "ic" || name === "ik" || name === "n")) {
        const periodSel = document.createElement("select");
        periodSel.dataset.name = name + "_period";
        periods.forEach((p) => {
          const opt = document.createElement("option");
          opt.value = p.value;
          opt.textContent = p.label;
          if (p.value === "monthly") opt.selected = true;
          periodSel.appendChild(opt);
        });
        inputWrap.appendChild(periodSel);
      }

      fieldGroup.appendChild(inputWrap);
      fieldsWrap.appendChild(fieldGroup);
    });

    // Se o resultado for taxa ou tempo (e não for SAC), adiciona o seletor do período do resultado
    if (key !== "sac" && (select.value === "i" || select.value === "ic" || select.value === "ik" || select.value === "n" || select.value === "t" || select.value === "eq_comp")) {
      const fieldGroup = document.createElement("div");
      fieldGroup.className = "field-group";

      const label = document.createElement("label");
      label.textContent = (select.value === "n" || select.value === "t") ? "Calcular tempo em:" : "Calcular taxa em:";
      fieldGroup.appendChild(label);

      const inputWrap = document.createElement("div");
      inputWrap.className = "input-wrap";

      const outSel = document.createElement("select");
      outSel.dataset.name = "out_period";
      periods.forEach((p) => {
        const opt = document.createElement("option");
        opt.value = p.value;
        opt.textContent = p.label;
        if (p.value === "monthly") opt.selected = true;
        outSel.appendChild(opt);
      });
      inputWrap.appendChild(outSel);
      fieldGroup.appendChild(inputWrap);
      fieldsWrap.appendChild(fieldGroup);
    }
  };

  select.addEventListener("change", renderFields);
  renderFields();
}

function getValuesByWrap(wrapId) {
  const values = {};
  document.querySelectorAll(`#${wrapId} input, #${wrapId} textarea`).forEach((inp) => {
    if (inp.dataset.name) {
      values[inp.dataset.name] = Number(inp.value);
    }
  });
  document.querySelectorAll(`#${wrapId} select`).forEach((sel) => {
    if (sel.dataset.name) {
      values[sel.dataset.name] = sel.value;
    }
  });
  return values;
}

function mustFinite(values) {
  // Ignora campos de texto e períodos na verificação de números finitos
  return Object.entries(values).every(([k, v]) => {
    if (k.endsWith("_period") || k === "out_period" || k === "fluxos") return true;
    return Number.isFinite(v);
  });
}

function attachActions() {
  document.querySelectorAll("button[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => runCalc(btn.dataset.action));
  });
}

function setResult(id, text, isError = false) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = text;
    if (isError) {
      el.style.borderColor = "rgba(239, 68, 68, 0.4)";
      el.style.color = "#ef4444";
    } else {
      el.style.borderColor = "";
      el.style.color = "";
    }
  }

  // Sincroniza o visor
  const visorMode = document.querySelector(".visor-mode");
  const visorValue = document.querySelector(".visor-value");
  if (visorMode && visorValue) {
    const activeCard = document.querySelector(".card.active");
    const modeName = activeCard ? activeCard.querySelector("h2").textContent : "FINANCE";
    visorMode.textContent = `MODE: ${modeName.toUpperCase()}`;
    if (isError) {
      visorValue.textContent = "ERROR";
      visorValue.style.color = "#f87171";
    } else {
      visorValue.textContent = text;
      visorValue.style.color = "";
    }
  }
}

function runCalc(action) {
  try {
    switch (action) {
      case "js":
        calcJurosSimples();
        break;
      case "jc":
        calcJurosCompostos();
        break;
      case "dcc":
        calcDescComercial();
        break;
      case "drc":
        calcDescRacional();
        break;
      case "sac":
        calcSac();
        break;
      case "te":
        calcTaxas();
        break;
      case "tec":
        calcTec();
        break;
      case "fvp":
        calcFvp();
        break;
      case "vpl":
        calcVpl();
        break;
      default:
        break;
    }
  } catch (err) {
    const target = defs[action]?.result || `${action}-result`;
    setResult(target, err.message, true);
  }
}

function positive(name, value) {
  if (!(value > 0)) throw new Error(`${name} deve ser maior que zero.`);
}

function calcJurosSimples() {
  const op = document.getElementById(defs.js.select).value;
  const vals = getValuesByWrap(defs.js.fieldsWrap);
  if (!mustFinite(vals)) throw new Error("Preencha todos os campos numericos.");

  const rateDays = periods.find(p => p.value === vals.i_period)?.days || 30;
  const timeDays = periods.find(p => p.value === vals.n_period)?.days || 30;
  const outDays = periods.find(p => p.value === vals.out_period)?.days || 30;

  if (op === "i" && vals.n === 0) throw new Error("n nao pode ser zero.");
  if (op === "n" && vals.i === 0) throw new Error("i nao pode ser zero.");
  if ((op === "i" || op === "n") && vals.VP === 0) throw new Error("VP nao pode ser zero.");

  let out;
  if (op === "vp") {
    const i_adj = (vals.i / 100) * (timeDays / rateDays);
    out = vals.VF / (1 + i_adj * vals.n);
  }
  else if (op === "vf") {
    const i_adj = (vals.i / 100) * (timeDays / rateDays);
    out = vals.VP * (1 + i_adj * vals.n);
  }
  else if (op === "j") {
    const i_adj = (vals.i / 100) * (timeDays / rateDays);
    out = vals.VP * i_adj * vals.n;
  }
  else if (op === "i") {
    const i_n_period = ((vals.VF / vals.VP) - 1) / vals.n;
    out = i_n_period * (outDays / timeDays);
  }
  else if (op === "n") {
    const i_adj = (vals.i / 100) * (outDays / rateDays);
    out = ((vals.VF / vals.VP) - 1) / i_adj;
  }

  const label = { vp: "VP", vf: "VF", j: "J", i: "i", n: "n" }[op];
  const text = op === "i"
    ? `${label} = ${formats.num6(out)} (${formats.pct(out)})`
    : op === "n"
      ? `${label} = ${formats.num6(out)}`
      : `${label} = ${formats.money(out)}`;
  setResult(defs.js.result, text, false);
}

function calcJurosCompostos() {
  const op = document.getElementById(defs.jc.select).value;
  const vals = getValuesByWrap(defs.jc.fieldsWrap);
  if (!mustFinite(vals)) throw new Error("Preencha todos os campos numericos.");

  const rateDays = periods.find(p => p.value === vals.i_period)?.days || 30;
  const timeDays = periods.find(p => p.value === vals.n_period)?.days || 30;
  const outDays = periods.find(p => p.value === vals.out_period)?.days || 30;

  if ((op === "i" || op === "n") && vals.VP === 0) throw new Error("VP nao pode ser zero.");
  if (op === "i" && vals.n === 0) throw new Error("n nao pode ser zero.");
  if (op === "n" && vals.i === -100) throw new Error("i nao pode ser -100%.");

  let out;
  if (op === "vp") {
    const i_adj = Math.pow(1 + vals.i / 100, timeDays / rateDays) - 1;
    out = vals.VF / Math.pow(1 + i_adj, vals.n);
  }
  else if (op === "vf") {
    const i_adj = Math.pow(1 + vals.i / 100, timeDays / rateDays) - 1;
    out = vals.VP * Math.pow(1 + i_adj, vals.n);
  }
  else if (op === "j") {
    const i_adj = Math.pow(1 + vals.i / 100, timeDays / rateDays) - 1;
    out = vals.VP * (Math.pow(1 + i_adj, vals.n) - 1);
  }
  else if (op === "i") {
    const i_n_period = Math.pow(vals.VF / vals.VP, 1 / vals.n) - 1;
    out = Math.pow(1 + i_n_period, outDays / timeDays) - 1;
  }
  else if (op === "n") {
    const i_adj = Math.pow(1 + vals.i / 100, outDays / rateDays) - 1;
    out = Math.log10(vals.VF / vals.VP) / Math.log10(1 + i_adj);
  }

  const label = { vp: "VP", vf: "VF", j: "J", i: "i", n: "n" }[op];
  const text = op === "i"
    ? `${label} = ${formats.num6(out)} (${formats.pct(out)})`
    : op === "n"
      ? `${label} = ${formats.num6(out)}`
      : `${label} = ${formats.money(out)}`;
  setResult(defs.jc.result, text, false);
}

function calcDescComercial() {
  const op = document.getElementById(defs.dcc.select).value;
  const vals = getValuesByWrap(defs.dcc.fieldsWrap);
  if (!mustFinite(vals)) throw new Error("Preencha todos os campos numericos.");

  const rateDays = periods.find(p => p.value === vals.i_period)?.days || 30;
  const timeDays = periods.find(p => p.value === vals.n_period)?.days || 30;
  const outDays = periods.find(p => p.value === vals.out_period)?.days || 30;

  if ((op === "i" || op === "t") && vals.N === 0) throw new Error("N nao pode ser zero.");
  if (op === "i" && vals.n === 0) throw new Error("n nao pode ser zero.");
  if ((op === "n" || op === "t") && vals.i === 100) throw new Error("i nao pode ser 100%.");

  let out;
  if (op === "a") {
    const d_adj = 1 - Math.pow(1 - vals.i / 100, timeDays / rateDays);
    out = vals.N * Math.pow(1 - d_adj, vals.n);
  }
  else if (op === "n") {
    const d_adj = 1 - Math.pow(1 - vals.i / 100, timeDays / rateDays);
    out = vals.A / Math.pow(1 - d_adj, vals.n);
  }
  else if (op === "dc") {
    const d_adj = 1 - Math.pow(1 - vals.i / 100, timeDays / rateDays);
    out = vals.N * (1 - Math.pow(1 - d_adj, vals.n));
  }
  else if (op === "i") {
    const d_n_period = 1 - Math.pow(vals.A / vals.N, 1 / vals.n);
    out = 1 - Math.pow(1 - d_n_period, outDays / timeDays);
  }
  else if (op === "t") {
    const d_adj = 1 - Math.pow(1 - vals.i / 100, outDays / rateDays);
    out = Math.log(vals.A / vals.N) / Math.log(1 - d_adj);
  }

  const label = { a: "A", n: "N", dc: "Dc", i: "i", t: "n" }[op];
  const text = op === "i"
    ? `${label} = ${formats.num6(out)} (${formats.pct(out)})`
    : op === "t"
      ? `${label} = ${formats.num6(out)}`
      : `${label} = ${formats.money(out)}`;
  setResult(defs.dcc.result, text, false);
}

function calcDescRacional() {
  const op = document.getElementById(defs.drc.select).value;
  const vals = getValuesByWrap(defs.drc.fieldsWrap);
  if (!mustFinite(vals)) throw new Error("Preencha todos os campos numericos.");

  const rateDays = periods.find(p => p.value === vals.i_period)?.days || 30;
  const timeDays = periods.find(p => p.value === vals.n_period)?.days || 30;
  const outDays = periods.find(p => p.value === vals.out_period)?.days || 30;

  if ((op === "i" || op === "t") && vals.A === 0) throw new Error("A nao pode ser zero.");
  if ((op === "i" || op === "t") && vals.N <= 0) throw new Error("N deve ser maior que zero.");
  if (op === "i" && vals.n === 0) throw new Error("n nao pode ser zero.");
  if (op === "t" && vals.i === -100) throw new Error("i nao pode ser -100%.");

  let out;
  if (op === "a") {
    const i_adj = Math.pow(1 + vals.i / 100, timeDays / rateDays) - 1;
    out = vals.N * Math.pow(1 + i_adj, -vals.n);
  }
  else if (op === "n") {
    const i_adj = Math.pow(1 + vals.i / 100, timeDays / rateDays) - 1;
    out = vals.A * Math.pow(1 + i_adj, vals.n);
  }
  else if (op === "dr") {
    const i_adj = Math.pow(1 + vals.i / 100, timeDays / rateDays) - 1;
    out = vals.N * (1 - Math.pow(1 + i_adj, -vals.n));
  }
  else if (op === "i") {
    const i_n_period = Math.pow(vals.N / vals.A, 1 / vals.n) - 1;
    out = Math.pow(1 + i_n_period, outDays / timeDays) - 1;
  }
  else if (op === "t") {
    const i_adj = Math.pow(1 + vals.i / 100, outDays / rateDays) - 1;
    out = (Math.log(vals.N) - Math.log(vals.A)) / Math.log(1 + i_adj);
  }

  const label = { a: "A", n: "N", dr: "Dr", i: "i", t: "n" }[op];
  const text = op === "i"
    ? `${label} = ${formats.num6(out)} (${formats.pct(out)})`
    : op === "t"
      ? `${label} = ${formats.num6(out)}`
      : `${label} = ${formats.money(out)}`;
  setResult(defs.drc.result, text, false);
}

function calcSac() {
  const op = document.getElementById(defs.sac.select).value;
  const vals = getValuesByWrap(defs.sac.fieldsWrap);
  if (!mustFinite(vals)) throw new Error("Preencha todos os campos numericos.");

  positive("n", vals.n);
  const amort = vals.VP / vals.n;
  let out;

  if (op === "amort") out = amort;
  if (op === "pmt") out = amort * (1 + (vals.n - vals.t + 1) * (vals.i / 100));
  if (op === "j") out = amort * (vals.n - vals.t + 1) * (vals.i / 100);
  if (op === "sd") out = vals.VP - amort * vals.t;

  const label = { amort: "Amortizacao", pmt: "PMT", j: "Juros", sd: "Saldo Devedor" }[op];
  setResult(defs.sac.result, `${label} = ${formats.money(out)}`, false);
}

function calcTaxas() {
  const op = document.getElementById(defs.te.select).value;
  const vals = getValuesByWrap(defs.te.fieldsWrap);
  if (!mustFinite(vals)) throw new Error("Preencha todos os campos numericos.");

  if ((op === "mm" || op === "mM") && vals.n === 0) throw new Error("n nao pode ser zero.");
  if (op === "ef" && vals.k === 0) throw new Error("k nao pode ser zero.");

  let out;
  if (op === "eq_comp") {
    const fromDays = periods.find(p => p.value === vals.ic_period)?.days || 30;
    const toDays = periods.find(p => p.value === vals.out_period)?.days || 30;
    out = Math.pow(1 + vals.ic / 100, toDays / fromDays) - 1;
  }
  else if (op === "mm") {
    out = Math.pow(1 + vals.ic / 100, 1 / vals.n) - 1;
  }
  else if (op === "mM") {
    out = Math.pow(1 + vals.ic / 100, vals.n) - 1;
  }
  else if (op === "ef") {
    out = (vals.ik / 100) / vals.k;
  }
  else if (op === "js_ef") {
    const rateDays = periods.find(p => p.value === vals.ic_period)?.days || 30;
    const timeDays = periods.find(p => p.value === vals.n_period)?.days || 30;
    const n_adj = vals.n * (timeDays / rateDays);
    out = (vals.ic / 100) / (1 - (vals.ic / 100) * n_adj);
  }
  else if (op === "js_dc") {
    const rateDays = periods.find(p => p.value === vals.i_period)?.days || 30;
    const timeDays = periods.find(p => p.value === vals.n_period)?.days || 30;
    const n_adj = vals.n * (timeDays / rateDays);
    out = (vals.i / 100) / (1 + (vals.i / 100) * n_adj);
  }

  setResult(defs.te.result, `Nova taxa = ${formats.num6(out)} (${formats.pct(out)})`, false);
}

function calcTec() {
  const op = document.getElementById(defs.tec.select).value;
  const vals = getValuesByWrap(defs.tec.fieldsWrap);
  if (!mustFinite(vals)) throw new Error("Preencha todos os campos numericos.");

  let out;
  if (op === "js_ef") {
    const rateDays = periods.find(p => p.value === vals.ic_period)?.days || 30;
    const timeDays = periods.find(p => p.value === vals.n_period)?.days || 30;
    const n_adj = vals.n * (timeDays / rateDays);

    const icUnit = vals.ic / 100;
    if (1 - icUnit * n_adj <= 0) throw new Error("Valores invalidos (denominador <= 0).");
    out = icUnit / (1 - icUnit * n_adj);
  }
  else if (op === "js_dc") {
    const rateDays = periods.find(p => p.value === vals.i_period)?.days || 30;
    const timeDays = periods.find(p => p.value === vals.n_period)?.days || 30;
    const n_adj = vals.n * (timeDays / rateDays);

    const iUnit = vals.i / 100;
    if (1 + iUnit * n_adj <= 0) throw new Error("Valores invalidos (denominador <= 0).");
    out = iUnit / (1 + iUnit * n_adj);
  }
  else if (op === "jc_ef") {
    if (vals.k === 0) throw new Error("k nao pode ser zero.");
    out = (vals.ik / 100) / vals.k;
  }

  setResult(defs.tec.result, `Nova taxa = ${formats.num6(out)} (${formats.pct(out)})`, false);
}

function calcFvp() {
  const n = Number(document.getElementById("fvp-n").value);
  const i = Number(document.getElementById("fvp-i").value) / 100;
  const vp = Number(document.getElementById("fvp-vp").value);
  const mult = Number(document.getElementById("fvp-mult").value);

  if (![n, i, vp, mult].every(Number.isFinite)) {
    throw new Error("Preencha todos os campos numericos.");
  }
  if (i === 0) throw new Error("Taxa i nao pode ser zero para esta formula.");

  const fvp = (1 - Math.pow(1 + i, -n)) / i;
  const pmt = vp * (1 / fvp);
  const resultado = fvp * mult;

  setResult(
    "fvp-result",
    `FVP = ${formats.num6(fvp)} | PMT = ${formats.num6(pmt)} | Resultado = ${formats.money(resultado)}`,
    false,
  );
}

function parseFluxos(raw) {
  const parts = raw
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .map(Number);

  if (!parts.length || parts.some((v) => !Number.isFinite(v))) {
    throw new Error("Fluxos invalidos. Use numeros separados por virgula.");
  }
  return parts;
}

function calcVpl() {
  const I = Number(document.getElementById("vpl-i0").value);
  const i = Number(document.getElementById("vpl-i").value) / 100;
  const n = Number(document.getElementById("vpl-n").value);
  const fluxos = parseFluxos(document.getElementById("vpl-fluxos").value);
  const temVR = document.getElementById("vpl-tem-vr").checked;
  const vrInput = Number(document.getElementById("vpl-vr").value);
  const periodoVR = Number(document.getElementById("vpl-periodo-vr").value);

  if (![I, i, n].every(Number.isFinite)) throw new Error("Preencha I, i e n.");
  positive("n", n);
  if (i === -1) throw new Error("i nao pode ser -1.");
  if (fluxos.length !== n) throw new Error(`Foram informados ${fluxos.length} fluxos, mas n = ${n}.`);

  let vpl = 0;
  for (let j = 1; j <= n; j += 1) {
    vpl += fluxos[j - 1] / Math.pow(1 + i, j);
  }

  if (temVR) {
    if (![vrInput, periodoVR].every(Number.isFinite)) {
      throw new Error("Informe VR e periodo do VR.");
    }
    vpl += vrInput / Math.pow(1 + i, periodoVR);
  }

  vpl -= I;

  const parecer = vpl < 0 ? "VPL negativo: deve recusar." : "VPL positivo: deve aceitar.";
  setResult("vpl-result", `VPL = ${formats.money(vpl)} | ${parecer}`, false);
}

function setupVplResidualToggle() {
  const check = document.getElementById("vpl-tem-vr");
  const vr = document.getElementById("vpl-vr");
  const periodo = document.getElementById("vpl-periodo-vr");

  const sync = () => {
    vr.disabled = !check.checked;
    periodo.disabled = !check.checked;
  };

  check.addEventListener("change", sync);
  sync();
}

const modeNames = {
  "#juros-simples": "Juros Simples",
  "#juros-compostos": "Juros Compostos",
  "#desc-comercial": "Desc. Comercial Composto",
  "#desc-racional": "Desc. Racional Composto",
  "#sac": "Amortização SAC",
  "#taxas": "Taxas Equivalentes",
  "#taxa-efetiva-comercial": "Taxa Comercial vs Efetiva",
  "#fvp": "FVP (Price)",
  "#vpl": "VPL (Valor Presente Líquido)"
};

function updateActiveCard() {
  const hash = window.location.hash || "#juros-simples";
  
  document.querySelectorAll("main.grid .card").forEach((card) => {
    card.classList.remove("active");
  });

  const targetCard = document.querySelector(hash);
  if (targetCard) {
    targetCard.classList.add("active");
  }

  document.querySelectorAll(".nav-item").forEach((link) => {
    if (link.getAttribute("href") === hash) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  const visorMode = document.querySelector(".visor-mode");
  const visorValue = document.querySelector(".visor-value");
  if (visorMode && visorValue && targetCard) {
    const modeName = targetCard.querySelector("h2").textContent;
    const resultElement = targetCard.querySelector(".result");
    const currentResultText = (resultElement && resultElement.textContent.trim()) ? resultElement.textContent : "-";
    visorMode.textContent = `MODE: ${modeName.toUpperCase()}`;
    visorValue.textContent = currentResultText;
    visorValue.style.color = "";
  }
}

function setupHoverVisor() {
  const visorMode = document.querySelector(".visor-mode");
  const visorValue = document.querySelector(".visor-value");
  if (!visorMode || !visorValue) return;

  document.querySelectorAll(".nav-item").forEach((link) => {
    const hash = link.getAttribute("href");
    const name = modeNames[hash] || "";

    link.addEventListener("mouseenter", () => {
      visorMode.textContent = "PREVIEW MODE";
      visorValue.textContent = name.toUpperCase();
    });

    link.addEventListener("mouseleave", () => {
      const activeHash = window.location.hash || "#juros-simples";
      const targetCard = document.querySelector(activeHash);
      if (targetCard) {
        const modeName = targetCard.querySelector("h2").textContent;
        const resultElement = targetCard.querySelector(".result");
        const currentResultText = (resultElement && resultElement.textContent.trim()) ? resultElement.textContent : "-";
        visorMode.textContent = `MODE: ${modeName.toUpperCase()}`;
        visorValue.textContent = currentResultText;
        visorValue.style.color = "";
      }
    });
  });
}

["js", "jc", "dcc", "drc", "sac", "te", "tec"].forEach(buildDynamicCalculator);
setupVplResidualToggle();
attachActions();
setupHoverVisor();

window.addEventListener("hashchange", updateActiveCard);
window.addEventListener("DOMContentLoaded", updateActiveCard);
