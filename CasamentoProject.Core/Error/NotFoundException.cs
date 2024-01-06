namespace CasamentoProject.Core.Error
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string? parameterName, string message) : base(message)
        {
        }
    }
}
