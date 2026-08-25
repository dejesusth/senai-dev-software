public class ProdutoService : IProdutoService
{
    private readonly IProdutoService _repo;

    public ProdutoService(IProdutoService repo) => _repo = repo;

    public IEnumerable<Produto> GetAll() => _repo.GetAll();

    public Produto? GetById(int id) => _repo.GetById(id);

    public Produto Create(Produto produto)
    {
        if (produto.Preco < 0)
            throw new ArgumentException("Preço inválido!");
        _repo.Add(produto);
        return produto;
    }

    public Produto? Update(int id, Produto p)
    {
        if (_repo.GetById(id) == null) return null;
        p.Id = id;
        _repo.Update(p);
        return p;
    }

    public Produto Delete(int id)
    {
        if(_repo.GetById(id)){
            _repo.Delete(id)
            return true;
        }
        return false;
    }

}