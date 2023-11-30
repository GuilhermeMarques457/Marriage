namespace CasamentoProject.Core.Utils
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string? parameterName, string message) : base(message)
        {
        }
    }
}
