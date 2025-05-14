package br.universidade.loja;

import br.universidade.loja.model.Categoria;
import br.universidade.loja.model.Estoque;
import br.universidade.loja.model.Produto;
import br.universidade.loja.repository.CategoriaRepository;
import br.universidade.loja.repository.EstoqueRepository;
import br.universidade.loja.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigDecimal;

@SpringBootApplication
public class LojaApplication implements CommandLineRunner {
	@Autowired
	private CategoriaRepository catRepo;
	@Autowired
	private ProdutoRepository prodRepo;
	@Autowired
	private EstoqueRepository estRepo;



    public static void main(String[] args) {
		SpringApplication.run(LojaApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception {
		System.out.println("Loja inicializada!");
		Categoria c1 = new Categoria();
		c1.setNome("Eletrônicos");
		catRepo.save(c1);

		Produto p1 = new Produto();
		p1.setNome("Smartphone");
		p1.setPreco(new BigDecimal("1500.00"));
		p1.setCategoria(c1);
		prodRepo.save(p1);

		Estoque e1 = new Estoque();
		e1.setProduto(p1);
		e1.setQuantidade(50);

		estRepo.save(e1);
	}

}
