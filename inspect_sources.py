import pdfplumber

pdf_path = r"C:\Users\pavan\Downloads\Final - Sheet1.pdf"
with pdfplumber.open(pdf_path) as pdf:
    print(f"PDF pages: {len(pdf.pages)}")
    for index, page in enumerate(pdf.pages, start=1):
        print(f"--- PAGE {index} ---")
        print(page.extract_text() or "")
