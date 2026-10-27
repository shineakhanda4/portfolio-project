<?php

declare(strict_types=1);

/**
 * Isolated PHP demonstration for the Shine Akhanda portfolio.
 *
 * This file is intentionally outside the React/Vite production build. It is not
 * imported into the website, is not executed by Cloudflare Pages, and is not
 * required for the portfolio to run.
 *
 * CLI:
 *   php examples/php-demo.php
 *   php examples/php-demo.php --name="Ayesha Rahman" --email="ayesha@example.com" \
 *     --type="website" --message="We need a small business website with a contact form."
 *
 * Built-in server, for isolated local inspection only:
 *   php -S 127.0.0.1:8080 examples/php-demo.php
 *   http://127.0.0.1:8080/?name=Ayesha&email=ayesha@example.com&type=website&message=...
 */

enum ProjectType: string
{
    case Website = 'website';
    case Application = 'application';
    case Marketing = 'marketing';
    case Seo = 'seo';
    case Infrastructure = 'infrastructure';

    public function label(): string
    {
        return match ($this) {
            self::Website => 'Website development',
            self::Application => 'React / Next.js application',
            self::Marketing => 'Digital marketing',
            self::Seo => 'SEO',
            self::Infrastructure => 'Linux / server infrastructure',
        };
    }
}

final readonly class ContactEnquiry
{
    public function __construct(
        public string $name,
        public string $email,
        public ProjectType $type,
        public string $message,
        public ?string $phone = null,
    ) {
    }

    /**
     * @param array<string, mixed> $input
     * @throws InvalidArgumentException
     */
    public static function fromInput(array $input): self
    {
        $name = trim((string) ($input['name'] ?? ''));
        $email = trim((string) ($input['email'] ?? ''));
        $message = trim((string) ($input['message'] ?? ''));
        $phone = trim((string) ($input['phone'] ?? ''));
        $typeValue = trim((string) ($input['type'] ?? ''));

        if (self::textLength($name) < 2 || self::textLength($name) > 100) {
            throw new InvalidArgumentException('Name must be between 2 and 100 characters.');
        }

        if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            throw new InvalidArgumentException('A valid email address is required.');
        }

        if (self::textLength($message) < 20) {
            throw new InvalidArgumentException('Message must be at least 20 characters.');
        }

        if (self::textLength($message) > 5000) {
            throw new InvalidArgumentException('Message must be no longer than 5,000 characters.');
        }

        $type = ProjectType::tryFrom($typeValue);
        if ($type === null) {
            throw new InvalidArgumentException(
                'Project type must be one of: website, application, marketing, seo, infrastructure.'
            );
        }

        if ($phone !== '' && self::textLength($phone) > 30) {
            throw new InvalidArgumentException('Phone number is too long.');
        }

        return new self(
            name: $name,
            email: $email,
            type: $type,
            message: $message,
            phone: $phone !== '' ? $phone : null,
        );
    }

    private static function textLength(string $value): int
    {
        return function_exists('mb_strlen') ? mb_strlen($value) : strlen($value);
    }
}

final class EnquiryFormatter
{
    public function asPlainText(ContactEnquiry $enquiry): string
    {
        $phone = $enquiry->phone ?? 'Not provided';

        return <<<TEXT
        Enquiry accepted
        ----------------
        Name:         {$enquiry->name}
        Email:        {$enquiry->email}
        Phone:        {$phone}
        Project type: {$enquiry->type->label()}
        Message:
        {$enquiry->message}

        This output was produced by examples/php-demo.php, an isolated PHP example.
        It is not connected to the contact form or the production website.
        TEXT;
    }
}

function exampleInput(): array
{
    return [
        'name' => 'Ayesha Rahman',
        'email' => 'ayesha@example.com',
        'phone' => '+8801700000000',
        'type' => 'website',
        'message' => 'We need a clear business website with a reliable enquiry route.',
    ];
}

function isWebRequest(): bool
{
    return PHP_SAPI !== 'cli' && PHP_SAPI !== 'phpdbg';
}

function readCliInput(): array
{
    $options = getopt('', ['name:', 'email:', 'type:', 'message:', 'phone::']);

    if ($options === false || $options === []) {
        return exampleInput();
    }

    return [
        'name' => $options['name'] ?? '',
        'email' => $options['email'] ?? '',
        'phone' => $options['phone'] ?? '',
        'type' => $options['type'] ?? '',
        'message' => $options['message'] ?? '',
    ];
}

function respond(string $body, int $status = 200): void
{
    if (isWebRequest()) {
        http_response_code($status);
        header('Content-Type: text/plain; charset=utf-8');
    }

    echo $body . PHP_EOL;

    if (isWebRequest()) {
        exit;
    }
}

try {
    $input = isWebRequest() ? $_GET : readCliInput();
    $enquiry = ContactEnquiry::fromInput($input);
    $formatter = new EnquiryFormatter();

    $prefix = isWebRequest()
        ? "Isolated PHP demonstration\n\n"
        : "Isolated PHP demonstration for shineakhanda.dev\n\n";

    respond($prefix . $formatter->asPlainText($enquiry));
} catch (InvalidArgumentException $exception) {
    respond('Validation error: ' . $exception->getMessage(), 422);
}
