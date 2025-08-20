namespace Blog.Core.Helpers;

public static class EnvironmentHelper
{
    public static string? GetEnvironmentVariableOrFile(string name)
    {
        var value = Environment.GetEnvironmentVariable(name);

        if (!string.IsNullOrEmpty(value) && value.StartsWith("/"))
        {
            try
            {
                if (File.Exists(value))
                {
                    return File.ReadAllText(value).Trim();
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error reading file {value}: {ex.Message}");
            }
        }

        return value;
    }
}
