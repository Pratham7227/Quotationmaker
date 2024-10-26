import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Work = () => {
    const [email, setEmail] = useState(false);
    const [pannum, setPanNum] = useState(false);
    const [tempArr, setTempArr] = useState([]);
    const [TotalAmount, setTotalAmount] = useState(0);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        const obj = [
            {
                type: ['text', 'number', 'number', 'number'],
                placeholder: ['Item Name', 'Quantity', 'Rate', 'Amount'],
                quantity: 0,
                rate: 0,
                amount: 0,
                itemname: ''
            }
        ];
        setTempArr(obj);
    }, []);

    const calculateTotalAmount = (array) => {
        const total = array.reduce((sum, item) => sum + item.amount, 0);
        setTotalAmount(total);
    };

    function handleSection(e, Index) {
        const name = e.target.name;
        const value = e.target.value;
        
        const updatedArray = tempArr.map((element, index) => {
            if (index === Index) {
                const updatedSection = {
                    ...element,
                    [name]: value
                };
                const quantity = name === "quantity" ? Number(value) : Number(element.quantity);
                const rate = name === "rate" ? Number(value) : Number(element.rate);
                updatedSection.amount = quantity * rate;
                return updatedSection;
            }
            return element;
        });
        setTempArr(updatedArray);
        calculateTotalAmount(updatedArray);
    }

    function handleClickSection(e) {
        e.preventDefault();
        const newSection = {
            type: ['text', 'number', 'number', 'number'],
            placeholder: ['Item Name', 'Quantity', 'Rate', 'Amount'],
            quantity: 0,
            rate: 0,
            amount: 0,
            itemname: ''
        };
        setTempArr([...tempArr, newSection]);
    }

    function handleToggleEmail() {
        setEmail(!email);
    }
    function handleTogglePan() {
        setPanNum(!pannum);
    }

    function handlePDF(data) {
        const doc = new jsPDF();
        let y = 10;
    
        // Title
        doc.setFontSize(18);
        doc.text("Quotation Maker", 10, y);
        y += 10;
    
        // Date and Quotation Number
        doc.setFontSize(12);
        doc.text(`Quotation Date: ${data.date}`, 10, y);
        y += 7;
        doc.text(`Quotation Number: ${data.number}`, 10, y);
        y += 10;
    
        // Your Details
        doc.setFontSize(14);
        doc.text("Your Details:", 10, y);
        y += 7;
        doc.setFontSize(12);
        doc.text(`Business Name: ${data.yourbusinessname}`, 10, y);
        y += 7;
        doc.text(`Mobile Number: ${data.yourmobilenumber}`, 10, y);
        y += 7;
        doc.text(`GST Number: ${data.yourgstnumber}`, 10, y);
        y += 7;
        doc.text(`Address: ${data.youraddress}`, 10, y);
        y += 7;
        doc.text(`City: ${data.yourcity}`, 10, y);
        y += 7;
        doc.text(`Zip Code: ${data.yourzipcode}`, 10, y);
        y += 7;
        doc.text(`State: ${data.yourstate}`, 10, y);
        y += 7;
        doc.text(`Email: ${data.youremail}`, 10, y);
        y += 7;
        doc.text(`Pan Number: ${data.yourpannumber}`, 10, y);
        y += 14; // Extra space before Client Details
    
        // Client Details
        doc.setFontSize(14);
        doc.text("Client Details:", 10, y);
        y += 7;
        doc.setFontSize(12);
        doc.text(`Client Name: ${data.clientbusinessname}`, 10, y);
        y += 7;
        doc.text(`Client Mobile Number: ${data.clientmobilenumber}`, 10, y);
        y += 7;
        doc.text(`Client GST Number: ${data.clientgstnumber}`, 10, y);
        y += 7;
        doc.text(`Client Address: ${data.clientaddress}`, 10, y);
        y += 7;
        doc.text(`Client City: ${data.clientcity}`, 10, y);
        y += 7;
        doc.text(`Client Zipcode: ${data.clientzipcode}`, 10, y);
        y += 7;
        doc.text(`Client Email: ${data.clientemail}`, 10, y);
        y += 7;
        doc.text(`Client Pan Number: ${data.clientpannumber}`, 10, y);
        y += 14; // Extra space before Items
    
        // Items
        doc.setFontSize(14);
        doc.text("Items", 10, y);
        y += 7;
    
        tempArr.forEach((item, index) => {
            doc.text(
                `${index + 1}. ${item.itemname} | Qty: ${item.quantity} | Rate: ${item.rate} | Amount: ${item.amount}`,
                10,
                y
            );
            y += 7;
        });
    
        // Total Amount
        y += 10; // Extra space before Total Amount
        doc.setFontSize(12);
        doc.text(`Total Amount: ${TotalAmount}`, 10, y);
    
        // Save the PDF
        doc.save("quotation.pdf");
    }
    

    return (
        <div className="p-5 sm:p-10">
            <div className="bg-gray-300 p-5 rounded-md shadow-lg">
                <p className="text-center text-xl font-bold mb-5">Quotation Maker</p>
                <form>
                    <div className="container mx-auto w-full sm:w-11/12 p-5 bg-white rounded-md shadow-md">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
                            <div className="flex flex-col sm:gap-2">
                                <div className="flex items-center gap-2">
                                    <label htmlFor="date" className="underline">Quotation Date:</label>
                                    <input
                                        type="date"
                                        id="date"
                                        className="p-1 bg-transparent border-b-2 w-full sm:w-72"
                                        {...register('date', { required: true })}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label htmlFor="number" className="underline">Quotation Number:</label>
                                    <input
                                        type="number"
                                        placeholder="A0001"
                                        id="number"
                                        className="p-1 bg-transparent border-b-2 w-full sm:w-72"
                                        {...register('number', { required: true })}
                                    />
                                </div>
                            </div>
                            <button className="bg-purple-600 text-white rounded-md py-1 px-3 mt-5 sm:mt-0" onClick={handleSubmit(handlePDF)}>
                                Get PDF
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <div className="UserForm w-full sm:w-1/2 p-5 bg-gray-100 rounded-md shadow-inner flex flex-col gap-3">
                                <p className="font-bold">Quotation Maker <span className="italic">(Your Details)</span></p>
                                <input type="text" placeholder="Enter Business Name" className="input" {...register('yourbusinessname', { required: true })} />
                                <input type="number" placeholder="Enter Mobile Number" className="input" {...register('yourmobilenumber', { required: true })} />
                                <input type="text" placeholder="Your GSTIN (optional)" className="input" {...register('yourgstnumber')} />
                                <input type="text" placeholder="Address (optional)" className="input" {...register('youraddress')} />
                                <div className="flex gap-3">
                                    <input type="text" placeholder="City" className="input w-full" {...register('yourcity', { required: true })} />
                                    <input type="text" placeholder="Zip Code" className="input w-full" {...register('yourzipcode', { required: true })} />
                                </div>
                                <input type="text" placeholder="State" className="input" {...register('yourstate', { required: true })} />
                                {email && <input type="email" placeholder="Email" className="input" {...register('email')} />}
                                {pannum && <input type="text" placeholder="PAN Number" className="input" {...register('yourpannumber')} />}
                                <div className="flex gap-2">
                                    {!email && <button className="btn bg-purple-600 text-white py-1 px-3 rounded-md" onClick={handleToggleEmail}>Add Email</button>}
                                    {!pannum && <button className="btn bg-purple-600 text-white py-1 px-3 rounded-md" onClick={handleTogglePan}>Add PAN No</button>}
                                </div>
                            </div>

                            <div className="ClientForm w-full sm:w-1/2 p-5 bg-gray-100 rounded-md shadow-inner flex flex-col gap-3">
                                <p className="font-bold">Quotation Maker <span className="italic">(Client Details)</span></p>
                                <input type="text" placeholder="Enter Client Name" className="input" {...register('clientbusinessname', { required: true })} />
                                <input type="number" placeholder="Enter Mobile Number" className="input" {...register('clientmobilenumber', { required: true })} />
                                <input type="text" placeholder="Client GSTIN (optional)" className="input" {...register('clientgstnumber')} />
                                <input type="text" placeholder="Address (optional)" className="input" {...register('clientaddress')} />
                                <div className="flex gap-3">
                                    <input type="text" placeholder="City" className="input w-full" {...register('clientcity', { required: true })} />
                                    <input type="text" placeholder="Zip Code" className="input w-full" {...register('clientzipcode', { required: true })} />
                                </div>
                                <input type="text" placeholder="State" className="input" {...register('clientstate', { required: true })} />
                                {email && <input type="email" placeholder="Email" className="input" {...register('clientemail')} />}
                                {pannum && <input type="text" placeholder="PAN Number" className="input" {...register('clientpannumber')} />}
                                <div className="flex gap-2">
                                    {!email && <button className="btn bg-purple-600 text-white py-1 px-3 rounded-md" onClick={handleToggleEmail}>Add Email</button>}
                                    {!pannum && <button className="btn bg-purple-600 text-white py-1 px-3 rounded-md " onClick={handleTogglePan}>Add PAN No</button>}
                                </div>
                            </div>
                        </div>

                        <div className="Items mt-5">
                            <div className="bg-purple-600 text-white p-3 rounded-t-xl flex justify-around">
                                <p>Item</p>
                                <p>Quantity</p>
                                <p>Rate</p>
                                <p>Amount</p>
                            </div>
                            <div className="bg-purple-100 p-5 rounded-b-md shadow-inner flex flex-col gap-3">
                                {tempArr.length === 0 ? (
                                    <p>Loading...</p>
                                ) : (
                                    tempArr.map((element, index) => (
                                        <div key={index} className="flex  justify-between ml-5">
                                            <input type={element.type[0]} placeholder={element.placeholder[0]} className="input bg-transparent p-1 focus:outline-none focus:border-b-2 focus:border-green-200" onChange={(e) => handleSection(e, index)} name="itemname" value={element.itemname} />
                                            <input type={element.type[1]} placeholder={element.placeholder[1]} className="input bg-transparent p-1 focus:outline-none focus:border-b-2 focus:border-green-200" onChange={(e) => handleSection(e, index)} name="quantity" value={element.quantity} />
                                            <input type={element.type[2]} placeholder={element.placeholder[2]} className="input bg-transparent p-1 focus:outline-none focus:border-b-2 focus:border-green-200" onChange={(e) => handleSection(e, index)} name="rate" value={element.rate} />
                                            <input type={element.type[3]} placeholder={element.placeholder[3]} className="input bg-transparent p-1 focus:outline-none focus:border-b-2 focus:border-green-200" value={element.amount} disabled />
                                        </div>
                                    ))
                                )}
                                <div className="flex justify-between mt-3">
                                    <button className="bg-purple-600 text-white py-1 px-3 rounded-md" onClick={handleClickSection}>Add Item</button>
                                    <p className="text-purple-600">Total Amount: {TotalAmount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Work;
