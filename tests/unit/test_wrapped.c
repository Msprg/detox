/*
 * DO NOT EDIT THIS FILE. Generated by checkmk.
 * Edit the original source file "test_wrapped.ts" instead.
 */

#include <check.h>

#line 1 "test_wrapped.ts"
/**
 * This file is part of the Detox package.
 *
 * Copyright (c) Doug Harple <detox.dharple@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

#include <stdlib.h>
#include <string.h>

// need defines first
#include "config.h"

#include "wrapped.h"

START_TEST(test_wrapped_malloc_fail)
{
#line 19
#ifdef SUPPORTS_COVERAGE
    wrapped_malloc_failure = 1;
    wrapped_malloc(5);
# else
    exit(EXIT_FAILURE);
#endif

}
END_TEST

START_TEST(test_wrapped_strdup_fail)
{
#line 27
#ifdef SUPPORTS_COVERAGE
    wrapped_strdup_failure = 1;
    wrapped_strdup("test");
# else
    exit(EXIT_FAILURE);
#endif

}
END_TEST

START_TEST(test_wrapped_malloc)
{
#line 35
    void *test;

    test = wrapped_malloc(16);
    ck_assert((test != NULL));

}
END_TEST

START_TEST(test_wrapped_strdup)
{
#line 41
    char *check;

    check = wrapped_strdup("so broken");
    ck_assert_str_eq(check, "so broken");
}
END_TEST

int main(void)
{
    Suite *s1 = suite_create("Core");
    TCase *tc1_1 = tcase_create("Core");
    SRunner *sr = srunner_create(s1);
    int nf;

    suite_add_tcase(s1, tc1_1);
    tcase_add_exit_test(tc1_1, test_wrapped_malloc_fail, 1);
    tcase_add_exit_test(tc1_1, test_wrapped_strdup_fail, 1);
    tcase_add_test(tc1_1, test_wrapped_malloc);
    tcase_add_test(tc1_1, test_wrapped_strdup);

    srunner_run_all(sr, CK_ENV);
    nf = srunner_ntests_failed(sr);
    srunner_free(sr);

    return nf == 0 ? 0 : 1;
}