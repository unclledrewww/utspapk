var daftarBarang = [
	['Civic Type R', 'putih', 800000],
	['Lamborghini', 'hitam', 5100000],
];
var daftarbeliBarang = [];

function showBarang() {
	let listBarang = document.getElementById('list-barang');
	listBarang.innerHTML = '';

	for (let i = 0; i < daftarBarang.length; i++) {
		let beliBarang = `<button class="btn btn-success" onclick='beliBarang(${i})'>Sewa</button>`;
		let btnEdit = `<button class="btn btn-warning" onclick="editBarang(${i})">Ubah</button>`;
		let btnHapus = `<button class="btn btn-danger" onclick="deleteBarang(${i})">Hapus</button>`;

		listBarang.innerHTML += `		
		<div class="col-md-4 col-sm-12 p-4">
			<div class="card p-3">
				<div class="card-body">
					<h5 class="card-title">${daftarBarang[i][0]} - ${daftarBarang[i][1]}</h5>
					<h6 class="card-subtitle mb-2 text-muted">${formatRupiah(daftarBarang[i][2].toString(), 'Rp.')} / Hari</h6>
				</div>
				<div class="d-grid gap-2">
					${beliBarang}
					${btnEdit}
					${btnHapus}
				</div>
			</div>
		</div>`;
	}
}

function showBeliBarang() {
	let listBarang = document.getElementById('barang-beli');
	listBarang.innerHTML = '';

	let total = 0;
	for (let i = 0; i < daftarbeliBarang.length; i++) {
		total += parseInt(daftarbeliBarang[i][2]);
		let btnHapus = `<button class="btn btn-danger" onclick="deleteBeliBarang(${i})">Hapus</button>`;

		listBarang.innerHTML += `		
		<div class="card p-3 m-2" style="width: 16rem">
			<div class="card-body">
				<h5 class="card-title">${daftarbeliBarang[i][0]} - ${daftarbeliBarang[i][1]}</h5>
				<h6 class="mb-2 card-subtitle text-muted"> ${formatRupiah(daftarbeliBarang[i][2].toString(), 'Rp.')} / Hari</h6>
			</div>
			<div class="d-grid gap-2">
				${btnHapus}
			</div>
		</div>`;
	}
	listBarang.innerHTML += `<h3>Total:<small class="text-muted"> ${formatRupiah(total.toString(), 'Rp.')}</small></h3>`;
}

function bayarBarang() {
	let hari = prompt('Berapa hari sewa ?');

	let listLogBarang = document.getElementById('log-barang-beli');
	listLogBarang.innerHTML = '';

	let total = 0;
	listLogBarang.innerHTML += `<p>Daftar barang yang dibeli</p>`;
	listLogBarang.innerHTML += `<p>Total sewa hari : ${hari}</p>`;
	for (let i = 0; i < daftarbeliBarang.length; i++) {
		total += parseInt(daftarbeliBarang[i][2]);
		listLogBarang.innerHTML += `		
		<div class="card p-3 m-2 text-center" style="width: 16rem">
			<div class="card-body">
				<h5 class="card-title text-dark">${daftarbeliBarang[i][0]} - ${daftarbeliBarang[i][1]}</h5>
				<h6 class="mb-2 card-subtitle text-muted"> ${formatRupiah(daftarbeliBarang[i][2].toString(), 'Rp.')} / Hari</h6>
			</div>
		</div>`;
	}
	total *= hari;
	listLogBarang.innerHTML += `<h3>Total:<small class="text-white"> ${formatRupiah(total.toString(), 'Rp.')}</small></h3>`;

	daftarbeliBarang = [];
	showBeliBarang();
	alert(`Total Belanja  : ${formatRupiah(total.toString(), 'Rp.')}`);
	alert('Terimakasih sudah menyewa disini');
}

function addBarang() {
	let inputNama = document.querySelector('input[name=nama]');
	let inputWarna = document.querySelector('input[name=warna]');
	let inputHarga = document.querySelector('input[name=harga]');
	daftarBarang.push([inputNama.value, inputWarna.value, inputHarga.value]);
	inputNama.value = '';
	inputWarna.value = '';
	inputHarga.value = '';
	showBarang();
}

function beliBarang(id) {
	daftarbeliBarang.push(daftarBarang[id]);
	showBeliBarang();
}

function editBarang(id) {
	let newBarang = prompt('Masukkan Nama baru', daftarBarang[id][0]);
	let newWarna = prompt('Masukkan Warna baru', daftarBarang[id][1]);
	let newHarga = prompt('Masukkan Harga baru', daftarBarang[id][2]);
	daftarBarang[id] = [newBarang, newWarna, newHarga];
	showBarang();
}

function deleteBarang(id) {
	daftarBarang.splice(id, 1);
	showBarang();
}

function deleteBeliBarang(id) {
	daftarbeliBarang.splice(id, 1);
	showBeliBarang();
}

showBarang();
showBeliBarang();

function formatRupiah(angka, prefix) {
	var number_string = angka.replace(/[^,\d]/g, '').toString(),
		split = number_string.split(','),
		sisa = split[0].length % 3,
		rupiah = split[0].substr(0, sisa),
		ribuan = split[0].substr(sisa).match(/\d{3}/gi);

	// tambahkan titik jika yang di input sudah menjadi angka ribuan
	if (ribuan) {
		separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}

	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	return prefix == undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
}
