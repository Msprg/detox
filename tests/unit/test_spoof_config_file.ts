/**
 * This file is part of the Detox package.
 *
 * Copyright (c) Doug Harple <detox.dharple@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>

#include "config_file_spoof.h"
#include "config_file.h"
#include "detox_struct.h"
#include "parse_options.h"

static char *detoxrc =
    "sequence default{safe{builtin \"safe\";};wipeup{remove_trailing;};};"
    "sequence \"iso8859_1\"{iso8859_1{builtin \"iso8859_1\";};safe{"
    "builtin \"safe\";};wipeup{remove_trailing;};};"
    "sequence \"iso8859_1-legacy\"{iso8859_1{builtin \"cp1252\";};iso8859_1{"
    "builtin \"iso8859_1\";};safe{builtin \"safe\";};wipeup{remove_trailing;"
    "};};sequence \"utf_8\"{utf_8{builtin \"unicode\";};safe{"
    "builtin \"safe\";};wipeup{remove_trailing;};};sequence \"utf_8-legacy\"{"
    "utf_8{builtin \"cp1252\";};utf_8{builtin \"unicode\";};safe{"
    "builtin \"safe\";};wipeup{remove_trailing;};};sequence \"uncgi\"{uncgi;"
    "safe{builtin \"safe\";};wipeup{remove_trailing;};};sequence \"lower\"{"
    "safe{builtin \"safe\";};lower;wipeup{remove_trailing;};};"
    "sequence \"iso8859_1-only\"{iso8859_1{builtin \"iso8859_1\";};};"
    "sequence \"cp1252-only\"{iso8859_1{builtin \"cp1252\";};};"
    "sequence \"utf_8-only\"{utf_8{builtin \"unicode\";};};"
    "sequence \"uncgi-only\"{uncgi;};sequence \"lower-only\"{lower;};ignore{"
    "filename \"{arch}\";};"
    ;

static char *tempfile;

void setup(void)
{
    int fd;

    tempfile = malloc(1024);
    sprintf(tempfile, "/tmp/detoxrc-test-XXXXXX");
    fd = mkstemp(tempfile);
    fprintf(stderr, "writing to %s\n", tempfile);
    dprintf(fd, "%s", detoxrc);
}

void teardown(void)
{
    fprintf(stderr, "deleting %s\n", tempfile);
    unlink(tempfile);
}

#test test_spoof_config_file
    options_t *main_options;
    struct detox_parse_results *parsed;
    struct detox_parse_results *spoofed;
    struct detox_sequence_list *parsed_sequence;
    struct detox_sequence_list *spoofed_sequence;
    struct detox_sequence_filter *parsed_filter;
    struct detox_sequence_filter *spoofed_filter;
    struct clean_string_options *parsed_options;
    struct clean_string_options *spoofed_options;

    main_options = options_init();
    parsed = parse_config_file(tempfile, NULL, main_options);
    spoofed = spoof_config_file();

    // check names

    parsed_sequence = parsed->sequences;
    spoofed_sequence = spoofed->sequences;

    do {
        if (parsed_sequence == NULL || spoofed_sequence == NULL) {
            break;
        }

        ck_assert_str_eq(parsed_sequence->name, spoofed_sequence->name);

        //
        //
        //

        parsed_filter = parsed_sequence->head;
        spoofed_filter = spoofed_sequence->head;

        do {
            if (parsed_filter == NULL || spoofed_filter == NULL) {
                break;
            }

            ck_assert_msg(parsed_filter->cleaner == spoofed_filter->cleaner, "unit test cleaner doesn't match spoofed cleaner");

            parsed_options = parsed_filter->options;
            spoofed_options = spoofed_filter->options;

            if (parsed_options != NULL && spoofed_options != NULL) {
                ck_assert_str_eq(
                    parsed_options->filename ? parsed_options->filename : "...NULL...",
                    spoofed_options->filename ? spoofed_options->filename : "...NULL..."
                );
                ck_assert_str_eq(
                    parsed_options->builtin ? parsed_options->builtin : "...NULL...",
                    spoofed_options->builtin ? spoofed_options->builtin : "...NULL..."
                );
                ck_assert_int_eq(parsed_options->remove_trailing, spoofed_options->remove_trailing);
                ck_assert_int_eq(parsed_options->max_length, spoofed_options->max_length);
            } else if (parsed_options != NULL || spoofed_options != NULL) {
                ck_assert_msg(parsed_options == NULL, "unit test options has options but the spoofed version doesn't");
                ck_assert_msg(spoofed_options == NULL, "spoofed options has options but the unit test version doesn't");
            }

            parsed_filter = parsed_filter->next;
            spoofed_filter = spoofed_filter->next;
        } while (1);

        //
        //
        //

        parsed_sequence = parsed_sequence->next;
        spoofed_sequence = spoofed_sequence->next;
    } while (1);

    ck_assert_msg(parsed_sequence == NULL, "unit test config file is too long");
    ck_assert_msg(spoofed_sequence == NULL, "spoofed config file is too long");

#main-pre
    tcase_add_checked_fixture(tc1_1, setup, teardown);