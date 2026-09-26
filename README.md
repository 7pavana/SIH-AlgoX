# MedQure — Hybrid Quantum × Clinical AI Screening Platform

**MedQure** is a research prototype for AI-assisted clinical screening, developed for the Smart India Hackathon (SIH). It demonstrates a hybrid quantum-classical machine learning approach for early disease detection across multiple medical domains.

---

## Overview

MedQure provides a clinical decision support workspace where doctors can screen patients for four disease categories using both structured clinical data and medical imaging. The platform combines:

- **Quantum-enhanced neural networks** — ResNet18 with a 2-qubit variational quantum circuit gate
- **Multi-disease screening** — Heart disease, Diabetes, Diabetic Retinopathy, and Skin Cancer
- **Explainable AI workflows** — Feature importance, Grad-CAM integration points
- **Longitudinal patient tracking** — Screening history, risk progression, clinical notes

> **Disclaimer**: This is a research prototype for demonstration purposes only. No clinical claims are made. All outputs are simulated and must not be used for medical decision-making.

---

## Architecture

### Quantum-Gated Branch Zooming Model

The core model (`model/quantum-gated-branch-zooming (1).ipynb`) implements a hybrid quantum-classical architecture:

```
ResNet18 Stem → Layer1 → Layer2 → Layer3 (256 channels)
                      ↓
              Squeeze Pooling
                      ↓
              2-Qubit Variational Circuit (2 layers)
                      ↓
              256-Channel Sigmoid Gate
                      ↓
              Gate × Layer3 Feature Map
                      ↓
              Layer4 → Global Pooling → 512 Features → 7-Class Head
```

**Key specifications:**
- **Backbone**: Pretrained ResNet18 (ImageNet weights)
- **Quantum circuit**: 2 qubits, 2 variational layers, angle embedding
- **Classes**: 7 (AKIEC, BCC, BKL, DF, MEL, NV, VASC for skin cancer)
- **Training**: 70/15/15 split (seed 42), batch size 32, LR 5e-5, patience 5, max 20 epochs
- **Loss**: Standard cross-entropy (no class weighting)
- **Normalization**: ImageNet mean/std, no augmentation

### Disease Screening Pathways

| Disease | Input Type | Features | Model Status |
|---------|------------|----------|--------------|
| **Heart Disease** | Tabular (13 clinical features) | Age, sex, chest pain, BP, cholesterol, ECG, exercise, vessels, thalassemia | Simulated inference |
| **Diabetes** | Tabular (21 health/lifestyle features) | Age, BMI, BP, cholesterol, glucose, lifestyle, healthcare access | Deterministic rule-based |
| **Diabetic Retinopathy** | Retinal fundus image | Image-based (5-class severity) | Quantum-gated ResNet18 |
| **Skin Cancer** | Dermoscopic image | Image-based (7-class lesion type) | Quantum-gated ResNet18 |

---

## Project Structure

```
SIH-AlgoX/
├── app/                          # Next.js App Router pages
│   ├── dashboard/               # Doctor dashboard
│   ├── patients/                # Patient registry & details
│   ├── sessions/                # Screening session details
│   ├── analytics/               # Aggregate screening analytics
│   ├── profile/                 # Doctor profile
│   ├── login/                   # Demo authentication
│   └── screening/               # Screening workflow (dynamic)
├── components/
│   ├── landing-page.tsx         # Public landing page
│   ├── doctor-app.tsx           # Doctor workspace (dashboard, patients, sessions)
│   ├── screening-experience.tsx # Interactive screening workflow
│   ├── hero-scientific-visual.tsx
│   └── model-pipeline.tsx       # Visual pipeline diagram
├── lib/
│   ├── screening-config.ts      # Disease configurations & form schemas
│   ├── mock-inference.ts        # Simulated model inference
│   └── mock-clinical-data.ts    # Synthetic patient/session data
├── model/
│   └── quantum-gated-branch-zooming (1).ipynb  # Training notebook
├── public/
│   └── images/                  # Demo assets
└── globals.css                  # Design system & medical UI theme
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd SIH-AlgoX

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to explore the platform.

### Demo Credentials
- **Email**: `ananya.rao@MedQure.demo`
- **Password**: `demo-password`

---

## How It Works

### 1. Landing Page → Screening Selection
Navigate to `/screening` or click "Start Screening" on the landing page. Choose from four disease pathways.

### 2. Input Collection
- **Tabular diseases (Heart, Diabetes)**: Structured forms with validated clinical fields
- **Image diseases (Retinopathy, Skin Cancer)**: Drag-and-drop image upload with preview

### 3. Simulated Analysis
The frontend runs a deterministic simulation showing pipeline stages:
- Input validation → Preprocessing → Feature extraction → Model inference → Result

### 4. Results & Explainability
- Primary screening outcome with confidence score
- Probability distribution (where applicable)
- Key clinical signals from input
- **Explainability placeholder** for future Grad-CAM/feature importance integration

### 5. Doctor Workspace (`/dashboard`)
- Patient registry with search/filter
- Session history per patient
- Analytics dashboard (screening volumes, risk distribution)
- Profile management with localStorage persistence

---

## Model Integration (Future)

The `.pth` model files for each disease will be placed in `/model/` and served via a backend API:

```
/model/
├── heart-disease.pth
├── diabetes.pth
├── retinopathy.pth
└── skin-cancer.pth
```

**Planned backend endpoints:**
- `POST /api/screening/heart` — Tabular inference
- `POST /api/screening/diabetes` — Tabular inference
- `POST /api/screening/retinopathy` — Image inference (multipart)
- `POST /api/screening/skin-cancer` — Image inference (multipart)

Each endpoint will load the respective `.pth`, run preprocessing, execute the quantum-gated ResNet18, and return structured results with probabilities and Grad-CAM heatmaps.

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS, CSS Variables (medical design system) |
| Animation | Framer Motion |
| Icons | Lucide React |
| ML Framework | PyTorch, PennyLane (quantum), TorchVision |
| Model Format | `.pth` (PyTorch state dict) |

---

## Design System

The UI uses a clinical design system defined in `app/globals.css`:

- **Color palette**: Medical blues, semantic risk colors (red/amber/green)
- **Typography**: Inter, JetBrains Mono for data
- **Spacing**: 4px base unit, consistent scale
- **Components**: Cards, tables, forms, badges, meters — all accessible

---

## Research Context

This prototype explores:
1. **Quantum advantage in medical imaging** — Can variational quantum circuits improve feature gating in CNNs?
2. **Explainable clinical AI** — Integrating Grad-CAM, attention maps, feature attribution
3. **Longitudinal screening workflows** — Patient history, risk progression, clinician-in-the-loop
4. **Multi-modal screening** — Unified interface for tabular + image modalities

---

## License

MIT License — See `LICENSE` for details.

---

## Acknowledgments

- Smart India Hackathon (SIH) for the problem statement
- PennyLane team for quantum ML framework
- Open-source medical imaging datasets (ISIC, EyePACS, UCI Heart Disease, BRFSS Diabetes)

---

## Contact

For research collaboration or questions about the quantum-gated architecture, refer to the training notebook in `model/quantum-gated-branch-zooming (1).ipynb`.