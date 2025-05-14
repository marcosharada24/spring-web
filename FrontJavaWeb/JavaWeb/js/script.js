$(document).ready(function () {
  const API_URL = 'http://127.0.0.1:8080/produtos';

  function fetchProdutos() {
    $.ajax({
      url: API_URL,
      method: 'GET',
      success: function (produtos) {
        let rows = '';
        produtos.forEach(produto => {
          rows += `
            <tr>
              <td>${produto.id}</td>
              <td>${produto.nome}</td>
              <td>${produto.preco}</td>
              <td>${produto.categoria.nome}</td>
              <td>
                <button class="btn btn-warning btn-edit" data-id="${produto.id}">Edit</button>
                <button class="btn btn-danger btn-delete" data-id="${produto.id}">Delete</button>
              </td>
            </tr>
          `;
        });
        $('#userTableBody').html(rows);
      }
    });
  }

  $('#btnAdd').click(function () {
    $('#userForm')[0].reset();
    $('#prodId').val('');
    $('#userModal').modal('show');
  });

  $('#userTableBody').on('click', '.btn-edit', function () {
    const prodId = $(this).data('id');
    $.ajax({
      url: `${API_URL}/${prodId}`,
      method: 'GET',
      success: function (produto) {
        $('#prodId').val(produto.id);
        $('#prodName').val(produto.nome);
        $('#prodPrice').val(produto.preco);
        $('#prodCategoria').val(produto.categoria.id);
        $('#userModal').modal('show');
      }
    });
  });

  $('#userForm').submit(function (event) {
    event.preventDefault();
    const prodId = $('#prodId').val();
    const produto = {
      nome: $('#prodName').val(),
      preco: parseFloat($('#prodPrice').val()),
      categoria: {
        id: parseInt($('#prodCategoria').val())
      }
    };

    const method = prodId ? 'PUT' : 'POST';
    const url = prodId ? `${API_URL}/${prodId}` : API_URL;

    $.ajax({
      url: url,
      method: method,
      contentType: 'application/json',
      data: JSON.stringify(produto),
      success: function () {
        $('#userModal').modal('hide');
        fetchProdutos();
      }
    });
  });

  $('#userTableBody').on('click', '.btn-delete', function () {
    const prodId = $(this).data('id');
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      $.ajax({
        url: `${API_URL}/${prodId}`,
        method: 'DELETE',
        success: function () {
          fetchProdutos();
        }
      });
    }
  });

  fetchProdutos();
});
