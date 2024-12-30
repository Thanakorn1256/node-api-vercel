export default function Form() {
    const handleSubmit = (e) => {
      e.preventDefault();
      alert("สมัครสำเร็จ!");
    };
  
    return (
      <div>
        <h1>กรอกข้อมูล</h1>
        <form onSubmit={handleSubmit}>
          <label>ชื่อ: <input type="text" name="name" required /></label>
          <br />
          <label>อีเมล: <input type="email" name="email" required /></label>
          <br />
          <button type="submit">ยืนยัน</button>
        </form>
      </div>
    );
  }