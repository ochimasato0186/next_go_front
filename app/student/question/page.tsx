"use client";
import { useState } from "react";
import SmartphoneFrame from "../../../components/SmartphoneFrame";
import SmartphoneHeader from "../../../components/SmartphoneHeader";
import StudentBell from "../../../components/StudentBell";
import StudentFooter from "../../../components/StudentFooter";

export default function QuestionPage() {
	const [form, setForm] = useState({
		school: "",
		tel: "",
		email: "",
		message: "",
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		alert("送信しました！\n" + JSON.stringify(form, null, 2));
	};
	return (
		<div className="min-h-screen flex items-center justify-center" style={{ background: '#f5f5f5' }}>
			<SmartphoneFrame>
				<SmartphoneHeader />
				<div style={{ position: 'absolute', top: '25mm', right: '3mm', zIndex: 50 }}><StudentBell count={3} /></div>
				<main className="flex-1 p-4 flex flex-col items-center justify-center">
					<form onSubmit={handleSubmit} style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', width: 340, maxWidth: '90vw' }}>
						<h2 style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' }}>お問い合わせ</h2>
						<div style={{ marginBottom: 20 }}>
							<label style={{ display: 'block', marginBottom: 6 }}>学校名</label>
							<input name="school" value={form.school} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }} />
						</div>
						<div style={{ marginBottom: 20 }}>
							<label style={{ display: 'block', marginBottom: 6 }}>電話番号</label>
							<input name="tel" value={form.tel} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }} />
						</div>
						<div style={{ marginBottom: 20 }}>
							<label style={{ display: 'block', marginBottom: 6 }}>メールアドレス</label>
							<input name="email" type="email" value={form.email} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }} />
						</div>
						<div style={{ marginBottom: 24 }}>
							<label style={{ display: 'block', marginBottom: 6 }}>お問い合わせ内容</label>
							<textarea name="message" value={form.message} onChange={handleChange} required rows={5} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16, resize: 'vertical' }} />
						</div>
						<button type="submit" style={{ width: '100%', padding: '12px 0', fontSize: 18, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}>送信</button>
					</form>
				</main>
				<StudentFooter />
			</SmartphoneFrame>
		</div>
	);
}
