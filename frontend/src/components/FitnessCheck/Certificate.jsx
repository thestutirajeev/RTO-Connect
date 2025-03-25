import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autoTable";
import logo from "../../assets/images/logo.png"; // Import Logo

//const logo = "/logo1.png"; // No need for import

const Certificate = ({ vehicleData, eligibility }) => {
    if (!vehicleData || eligibility === null) {
        return <p className="mt-3 text-gray-500">Fill in the details and check eligibility.</p>;
    }
    const handleDownload = () => {
        const doc = new jsPDF();

        // ✅ Add Logo at the Top
        doc.addImage(logo, "PNG", 10, 10, 30, 30); // (image, type, x, y, width, height)

        // ✅ Add Certificate Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("Vehicle Fitness Certification", 60, 20);

        // ✅ Add a Horizontal Line
        doc.setLineWidth(0.5);
        doc.line(10, 35, 200, 35);

        // ✅ Add Vehicle Details in Table Format
        autoTable(doc, {
            startY: 45,
            head: [["Field", "Details"]],
            body: [
                ["Registration No:", vehicleData.regNumber],
                ["Owner Name:", vehicleData.ownerName],
                ["Chassis Number:", vehicleData.chassisNumber],
                ["Engine Number:", vehicleData.engineNumber],
                ["Model:", vehicleData.model],
                ["Manufactured Year:", vehicleData.year],
                ["Vehicle Type:", vehicleData.vehicleType],
                ["Fuel Type:", vehicleData.fuelType],
                ["Emission Level:", vehicleData.emissionLevel],
                ["Insurance Expiry:", vehicleData.insuranceExpiry],
                ["Fitness Validity:", "5 Years"], // Static value
            ],
            theme: "grid",
            headStyles: { fillColor: [22, 160, 133] }, // Green header
        });

        // ✅ Add Eligibility Status with Colors
        doc.setFontSize(10);
        doc.setTextColor(40);
        if (eligibility) {
            doc.setTextColor(22, 160, 133); // Green
            doc.text("✅ This vehicle meets the fitness & emission standards.", 40, doc.lastAutoTable.finalY + 15);
        } else {
            doc.setTextColor(192, 57, 43); // Red
            doc.text("❌ This vehicle does NOT meet the fitness standards.", 40, doc.lastAutoTable.finalY + 15);
        }

        // ✅ Add Authorized Signature
        doc.setTextColor(0);
        doc.text("Authorized Signature", 140, doc.lastAutoTable.finalY + 40);
        doc.line(140, doc.lastAutoTable.finalY + 42, 190, doc.lastAutoTable.finalY + 42); // Signature line

        // ✅ Save the PDF
        doc.save(`Fitness_Certificate_${vehicleData.regNumber}.pdf`);
    };



    return eligibility ? (
        <div className="p-5 border-2 border-green-500 bg-white rounded-lg shadow-lg mt-5">
            <h2 className="text-xl font-bold text-green-600">✅ Vehicle Fitness Certificate</h2>
            <p>Registration No: {vehicleData.regNumber}</p>
            <p>Model: {vehicleData.model}</p>
            <p>Manufactured Year: {vehicleData.year}</p>
            <p>Issued on: {new Date().toLocaleDateString()}</p>
            <button onClick={handleDownload} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Download Certificate</button>
        </div>
    ) : (
        <p className="mt-3 text-red-500">⚠️ Vehicle is not eligible for certification.</p>
    );
};

export default Certificate;