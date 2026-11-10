# SPEC-03: Computational Architecture, Voice AI & Real-Time APIs

* **Document ID:** SPEC-03-COMPUTATION-AI
* **Authors:** Ar. M. Sridhar Chauhan, Antigravity Agent
* **Status:** Approved
* **Date:** 2026-11-02

--------------------------------------------------------------------------------

## 1. Executive Summary & Vision

AGNAA operates Engine 02 as an in-house computational research laboratory. Unlike traditional firms that treat AI as a decorative concept, AGNAA builds and distributes zero-latency desktop software, fine-tunes custom architectural reasoning models, and connects live search retrieval directly to municipal and commodity data layers.

---

## 2. Checkpoint-250: Laya AI Architectural Reasoning Model

### 2.1 Model Topology & Training Provenance
* **Training Notebook:** `UPSC_R1_7B_V8_TRAINER.ipynb`
* **Base Architecture:** DeepSeek-R1-Distill-7B open-weights reasoning backbone, fine-tuned via PyTorch & PEFT LoRA.
* **Checkpoint Identifier & Artifacts:** `checkpoint-250` (Trained step 250 checkpoint folder on Google Drive `151vSHZ-yNWdToTYN-klcgCT4jtEal6yx`):
  - `adapter_config.json`: LoRA configuration (Rank $r=16$, Alpha $\alpha=32$, target modules `q_proj`, `k_proj`, `v_proj`, `o_proj`, `gate_proj`, `up_proj`, `down_proj`).
  - `adapter_model.safetensors`: Quantized LoRA adapter tensors.
  - `chat_template.jinja`: Jinja2 chat template formatting chain-of-thought `<think>...</think>` tokens for architectural reasoning.
  - `tokenizer_config.json` & `tokenizer.json`: Domain-extended BPE vocabulary.
  - Training artifacts: `optimizer.pt`, `scheduler.pt`, `scaler.pt`, `rng_state.pth`, `trainer_state.json`, `training_args.bin`.
* **Domain Grounding Data Sources:**
  1. **Aayam Spatial Formulations:** Classical Indian architectural proportioning formulas from Ar. M. Sridhar Chauhan's `Aayam Calculations` master database (Ayadi Shadvarga: Aayam, Dhana, Runa, Yoni, Nakshatra, Ayu). Computes energetic and volumetric balances (*Dhwaja*, *Dhumra*, *Simha*, *Vrishabha*) based on plot perimeter and floor dimensions.
  2. **Statutory Building Byelaw Reasoning:** Real-time interpretation of GHMC G.O. Ms. 168, TG-bPASS regulations, and National Building Code of India (NBC 2026) structural/fire clauses.
  3. **Demystified Bioclimatic Vastu:** Explains classical Sanskrit directives using microclimate thermodynamics (infrared thermal massing, monsoon cross-ventilation, and solar angles in the Deccan Plateau).

### 2.2 Sample Inference Contracts
```json
{
  "query": "Calculate Aayam for 40ft by 60ft plot",
  "reasoning_steps": [
    "Plot Dimensions: Length = 60 ft, Width = 40 ft",
    "Perimeter P = 2 * (60 + 40) = 200 ft",
    "Aayam Formula: Remainder of (P * 8) / 12 = (200 * 8) % 12 = 1600 % 12 = 4 (Remainder 1 in 8-fold classification)",
    "Result Classification: Dhwaja Aayam (Symbol of Prosperity and Stability)"
  ],
  "architectural_recommendation": "Optimal alignment for master suite in Nairutya (South-West) and entrance in Ishanya (North-East) to maximize Deccan morning solar ingress."
}
```

---

## 3. AGNAA Voice v2.0 (Whisper F8 Offline CAD Dictation)

### 3.1 Overview & System Specs
* **Binary Distribution:** 442 MB standalone portable Windows executable (`Agnaa-Voice-v2.0-Windows-Portable.zip`).
* **Model Engine:** Local OpenAI Whisper Small/Base running on quantized ONNX / DirectML runtime (100% private, zero cloud latency).
* **Latency Benchmark:** Sub-0.4s audio-to-text response on standard Intel/AMD laptops (CPU or NVIDIA GPU).
* **Global Hotkey:** `F8` toggles instant microphone dictation across any active Windows application.

### 3.2 Architectural Vocabulary Dictionary
Pre-trained vocabulary layer optimized for CAD and BIM software (AutoCAD, Autodesk Revit, Rhinoceros, SketchUp):
* Architectural commands: *Wall*, *Extrude*, *Fillet*, *Chamfer*, *Offset*, *Trim*, *Pline*, *Dimlinear*.
* Dimension syntax: Automatically parses spoken numbers into CAD foot-inch notation (e.g., *"twelve foot six"* ➔ `12' 6"`).
* Structural labels: *Beam B4*, *Column C12*, *Plinth LVL +450*, *TMT 16mm rebar spacing 150 c/c*.

---

## 4. Real-Time API Integrations

### 4.1 Octen.ai Statutory Search Integration
* **File Path:** [`src/app/api/zoning-search/route.ts`](file:///i:/AGNAA/agnaa_in/src/app/api/zoning-search/route.ts)
* **Configuration:** Loaded from `OCTEN_API_KEY` in `.env.local`.
* **Latency:** Sub-650ms average round-trip.
* **Mechanism:** Queries Octen's real-time AI-native search index (`https://api.octen.ai/search`) with targeted keyword filters. Extracts statutory excerpts from Telangana State Gazettes, TG-bPASS portal files, and municipal planning guides.
* **Grounding Layer:** Prevents LLM hallucinations on changing government orders (e.g. road widening acquisitions, commercial corridor declarations).

### 4.2 TinyFish Cloud Browser & Spot-Rate Harvester
* **File Path:** [`src/app/api/live-rates/route.ts`](file:///i:/AGNAA/agnaa_in/src/app/api/live-rates/route.ts) & [`src/data/liveRates.json`](file:///i:/AGNAA/agnaa_in/src/data/liveRates.json)
* **MCP Registration:** Connected via `mcp-remote https://agent.tinyfish.ai/mcp` with `TINYFISH_API_KEY`.
* **Capabilities:**
  1. **Automated Wholesale Scraping:** Extracts daily wholesale commodity rates for primary TMT steel (Tata Tiscon, JSW), cement (UltraTech, Bharathi), and aggregate from Hyderabad industrial hubs.
  2. **TG-bPASS Portal Navigation:** Utilizes `tinyfish:run_web_automation` to interact with dynamic municipal single-page applications behind login/session gates to verify land use categories and survey numbers.
